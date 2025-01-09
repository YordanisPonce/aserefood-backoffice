"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useModal from "@/components/partials/Modal/hooks/useModal";
import { CreateCategory, CreateSubCategory } from "@/lib/types/category";
import { createCategorySchema, createSubCategorySchema } from "../utils/schema";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "@/lib/services/categories";
import { CategoryForm } from "../components/CategoryForm";
import { modalTypes } from "@/components/partials/Modal/types/modalTypes";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";

export enum CategoryFormModality {
  CreateCategory = 0,
  UpdateCategory = 1,
  CreateSubCategory = 2,
}

export const CategoryFormContainer: FunctionComponent = () => {
  const { entityId: categoryId, handleCloseModal, currentModal } = useModal();
  const { openSnackBar } = useSnackBar();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [formModality] = useState<CategoryFormModality>(
    !categoryId
      ? CategoryFormModality.CreateCategory
      : currentModal === modalTypes.subcategories.form.name
      ? CategoryFormModality.CreateSubCategory
      : CategoryFormModality.UpdateCategory
  );
  const formOptions: UseFormProps<CreateCategory | CreateSubCategory> = {
    resolver: zodResolver(
      formModality === CategoryFormModality.CreateSubCategory
        ? createSubCategorySchema()
        : createCategorySchema()
    ),
    defaultValues:
      formModality === CategoryFormModality.CreateSubCategory
        ? {
            name: undefined,
            description: undefined,
          }
        : {
            name: undefined,
            description: undefined,
            parent: null,
          },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };

  const methods = useForm<CreateCategory | CreateSubCategory>(formOptions);

  const onSubmit = async (category: CreateCategory | CreateSubCategory) => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (!categoryId) {
        const { name, description, parent } = category as CreateCategory;
        await createCategory({
          name,
          description,
          parentId: parent?.id ?? null,
        });
        openSnackBar("Categoría creada con éxito", "success");
      } else if (formModality === CategoryFormModality.UpdateCategory) {
        const { name, description, parent } = category as CreateCategory;
        await updateCategory(categoryId, {
          name,
          description,
          parentId: parent?.id ?? null,
        });
        openSnackBar(
          `Categoría con identificador ${categoryId} actualizada con éxito`,
          "success"
        );
      } else {
        const { name, description } = category as CreateSubCategory;
        await createCategory({
          name,
          description,
          parentId: +categoryId,
        });
        openSnackBar("Categoría creada con éxito", "success");
      }
      await revalidateServerTags("categories");
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
    async (categoryId: string) => {
      setLoadingData(true);
      try {
        const category = await getCategory(categoryId);
        methods.reset({
          name: category.name,
          description: category.description,
          parent: category.parentId
            ? {
                id: category.parentId,
                name: category.parentName,
              }
            : null,
        });
      } catch {
        console.log("error");
      } finally {
        setLoadingData(false);
      }
    },
    [methods]
  );

  const getAllCategoriesFetch = async () => {
    const categories = await getAllCategories();

    return categoryId
      ? categories.filter((category) => category.id.toString() !== categoryId)
      : categories;
  };

  useEffect(() => {
    if (categoryId && formModality === CategoryFormModality.UpdateCategory)
      updateForm(categoryId);
  }, [categoryId, formModality, updateForm]);

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
          <CategoryForm
            isLoading={isLoading}
            formModality={formModality}
            error={error}
            getAllCategoriesFetch={getAllCategoriesFetch}
          />
        )}
      </form>
    </FormProvider>
  );
};
