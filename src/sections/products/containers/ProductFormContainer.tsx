"use client";
import { CreateProduct, CreateProductDTO } from "@/lib/types/products";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { createProductSchema } from "../utils/schema";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "@/lib/services/products";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import { ProductForm } from "../components/ProductForm";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { routes } from "@/lib/config/routes";
import { signOut } from "next-auth/react";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";

export const ProductFormContainer: FunctionComponent = () => {
  const {
    entityId: productId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const formOptions: UseFormProps<CreateProduct> = {
    resolver: zodResolver(createProductSchema()),
    defaultValues: {
      categories: [],
      description: undefined,
      name: undefined,
      image: null,
      isService: false,
      providers: [],
      shortDescription: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<CreateProduct>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async ({
    name,
    description,
    image: file,
    categories,
    isService,
    providers,
    shortDescription,
  }: CreateProduct) => {
    setIsLoading(true);
    setError(undefined);

    const createProductDto: CreateProductDTO = {
      categoryIds: categories.map((category) => category.id),
      description,
      isService,
      image: file ? await fileToBase64(file) : null,
      name,
      shortDescription,
      providerIds: providers.map((provider) => provider.id),
    };

    try {
      let response: ApiError;
      if (!productId) {
        response = await createProduct(createProductDto);
        errorClientHandling(response);
        openSnackBar("Producto creado con éxito", "success");
      } else {
        response = await updateProduct(productId, createProductDto);
        errorClientHandling(response);
        openSnackBar(
          `Producto con identificador ${productId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("products");
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
    async (productId: string) => {
      setLoadingData(true);
      try {
        const product = await getProduct(productId);
        methods.reset({
          description: product.description,
          name: product.name,
          image: base64ToFile(product?.image, product.name),
          isService: product.isService,
          shortDescription: product.shortDescription,
          providers: product.providers,
          categories: product.categories,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  useEffect(() => {
    if (productId) updateForm(productId);
  }, [productId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error, contentRef]);

  useEffect(() => {
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
          <ProductForm
            isLoading={isLoading}
            isUpdate={productId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};
