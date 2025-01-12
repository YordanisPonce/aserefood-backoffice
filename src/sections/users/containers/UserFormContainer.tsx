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
import { createUserSchema, updateUserSchema } from "../utils/schema";
import { CreateUser, UpdateUser } from "@/lib/types/users";
import { createUser, getUser, updateUser } from "@/lib/services/user";
import { UserForm } from "../components/UserForm";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import {
  createFileFromUrl,
  createSerializeFile,
} from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";

export const UserFormContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const {
    entityId: userId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const [error, setError] = useState<string | undefined>(undefined);
  const formOptions: UseFormProps<CreateUser | UpdateUser> = {
    resolver: zodResolver(!userId ? createUserSchema() : updateUserSchema()),
    defaultValues: !userId
      ? {
          name: undefined,
          email: undefined,
          password: undefined,
          lastnames: undefined,
          phoneNumber: undefined,
          username: undefined,
          image: null,
        }
      : {
          name: undefined,
          email: undefined,
          lastnames: undefined,
          phoneNumber: undefined,
          username: undefined,
          image: null,
        },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateUser | UpdateUser>(formOptions);

  const onSubmit = async (user: CreateUser | UpdateUser) => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (!userId) {
        const {
          username,
          password,
          email,
          name,
          lastnames,
          phoneNumber,
          image: file,
        } = user as CreateUser;
        await createUser({
          name,
          lastnames,
          username,
          password,
          role: "customer", // defualt value
          phoneNumber,
          email,
          image: file ? await createSerializeFile(file) : null,
        });
        openSnackBar("Usuario creado con éxito", "success");
      } else {
        const {
          username,
          email,
          name,
          lastnames,
          phoneNumber,
          image: file,
        } = user as UpdateUser;
        await updateUser(userId, {
          name,
          lastnames,
          username,
          role: "customer", // defualt value
          phoneNumber,
          email,
          image: file ? await createSerializeFile(file) : null,
        });
        openSnackBar(
          `Usuario con identificador ${userId} actualizado con éxito`,
          "success"
        );
      }
      await revalidateServerTags("users");
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
    async (userId: string) => {
      setLoadingData(true);
      try {
        const user = await getUser(userId);
        methods.reset({
          name: user.name,
          lastnames: user.lastnames,
          email: user.email,
          phoneNumber: user.phoneNumber,
          username: user.username,
          image: user.image
            ? await createFileFromUrl(user.image, user.username)
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

  useEffect(() => {
    if (userId) updateForm(userId);
  }, [userId, updateForm]);

  useEffect(() => {
    if (error && contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

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
          <UserForm
            isLoading={isLoading}
            isUpdate={userId !== null}
            error={error}
          />
        )}
      </form>
    </FormProvider>
  );
};
