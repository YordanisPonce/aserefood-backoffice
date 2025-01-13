"use client";
import {
  CreateProduct,
  CreateProductDTO,
  StatesProducts,
} from "@/lib/types/products";
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
import {
  base64ToFile,
  createFileFromUrl,
  fileToBase64,
} from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const ProductFormContainer: FunctionComponent = () => {
  const {
    entityId: productId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
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
      isService: StatesProducts.SERVICE,
      providers: [],
      shortDescription: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<CreateProduct>(formOptions);

  const onSubmit = async ({
    name,
    description,
    image: file,
    categories,
    isService: state,
    providers,
    shortDescription,
  }: CreateProduct) => {
    setIsLoading(true);
    setError(undefined);

    const createProductDto: CreateProductDTO = {
      categoryIds: categories.map((category) => category.id),
      description,
      isService: state === StatesProducts.SERVICE ? true : false,
      image: file ? await fileToBase64(file) : null,
      name,
      shortDescription,
      providerIds: providers.map((provider) => provider.id),
    };

    try {
      if (!productId) {
        await createProduct(createProductDto);
        openSnackBar("Producto creado con éxito", "success");
      } else {
        await updateProduct(productId, createProductDto);
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
        setError(error.message);
        openSnackBar(error.message, "error");
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
          image: base64ToFile(product.image, product.name),
          isService: product.isService
            ? StatesProducts.SERVICE
            : StatesProducts.NOTSERVICE,
          shortDescription: product.shortDescription,
          providers: product.providers,
          categories: product.categories,
        });
      } catch(error) {
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
