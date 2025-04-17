"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import {
  CreateProductCombo,
  CreateProductComboDTO,
  StatesProductCombos,
} from "@/lib/types/productCombo";
import { createProductComboSchema } from "../utils/schema";
import {
  createProductCombo,
  getProductCombo,
  updateProductCombo,
} from "@/lib/services/productCombos";
import { ProductComboForm } from "../components/ProductComboForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { signOut } from "next-auth/react";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { routes } from "@/lib/config/routes";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";
import { getAvailableProductsByZone } from "@/lib/services/products";
import { getProductsInComboWithAmount } from "../utils/helpers";

export const ProductComboFormContainer: FunctionComponent = () => {
  const {
    entityId: productComboId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreateProductCombo> = {
    resolver: zodResolver(createProductComboSchema()),
    defaultValues: {
      name: undefined,
      description: undefined,
      image: null,
      isActive: StatesProductCombos.INACTIVE,
      price: 1,
      productComboItems: [],
      shortDescription: undefined,
      zone: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateProductCombo>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({
    name,
    description,
    image: file,
    isActive: state,
    price,
    productComboItems,
    shortDescription,
    zone,
  }: CreateProductCombo) => {
    setIsLoading(true);
    setError(undefined);
    console.log("Product combos on submit", productComboItems);
    const createProductComboDTO: CreateProductComboDTO = {
      name: name,
      description,
      image: file ? await fileToBase64(file) : null,
      isActive: state === StatesProductCombos.ACTIVE ? true : false,
      price,
      productComboItems: productComboItems.map(item => {
        return {
          productId: item.product?.product.id ?? 0,
          amount: item.amount,
        };
      }),
      shortDescription,
      zoneId: zone?.id ?? 0,
    };
    try {
      let response: ApiError;
      if (!productComboId) {
        response = await createProductCombo(createProductComboDTO);
        errorClientHandling(response);
        openSnackBar("Combo de producto creado con éxito", "success");
      } else {
        response = await updateProductCombo(
          productComboId,
          createProductComboDTO
        );
        errorClientHandling(response);
        openSnackBar(
          `Combo de producto con identificador ${productComboId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("product-combos");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error instanceof UnauthorizedClientError) {
          openAlertDialog(error.message, "error", () => {
            signOut({ redirect: true, callbackUrl: routes.login.path });
          });
        } else {
          setError(error.message);
          openSnackBar(error.message, "error");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = useCallback(
    async (productComboId: string) => {
      setLoadingData(true);
      try {
        const productCombo = await getProductCombo(productComboId);
        const zoneProducts = await getAvailableProductsByZone(
          productCombo.zoneId.toString()
        );

        methods.reset({
          name: productCombo.name,
          description: productCombo.description,
          image: productCombo.image
            ? base64ToFile(productCombo.image, productCombo.name)
            : null,
          isActive: productCombo.isActive
            ? StatesProductCombos.ACTIVE
            : StatesProductCombos.INACTIVE,
          price: productCombo.price,
          productComboItems: getProductsInComboWithAmount(
            zoneProducts,
            productCombo
          ),
          shortDescription: productCombo.shortDescription,
          zone: {
            id: productCombo.zoneId,
            name: productCombo.zoneName,
          },
        });
      } catch {
        console.log("error");
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  useEffect(() => {
    if (productComboId) updateForm(productComboId);
  }, [productComboId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error, contentRef]);

  const productsCombosItmes = methods.watch("productComboItems");
  useEffect(() => {

    console.log("errors", errors);
    console.log("errors - productsCombosItmes", productsCombosItmes);
    if (errors && Object.keys(errors).length > 0 && !isValid) {
      setError(undefined);
      setTimeout(() => {
        setError("El formulario presenta errores. Por favor revise");
      }, 0);
    } else {
      setError(undefined);
    }
  }, [isValid, errors]);

  return (
    <FormProvider {...methods}>
      <form
        action="#"
        onSubmit={methods.handleSubmit(onSubmit)}
        onReset={handleCloseModal}
        autoComplete="off"
        className="relative z-10"
      >
        {loadingData ? (
          <LoadingScreen sx={{ height: "100%" }} />
        ) : (
          <ProductComboForm
            isLoading={isLoading}
            isUpdate={productComboId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};
