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
import {
  createUserSchema,
  Item,
  roles,
  updateUserSchema,
} from "../utils/schema";
import { CreateUser, UpdateUser } from "@/lib/types/users";
import { createUser, getUser, updateUser } from "@/lib/services/user";
import { UserForm } from "../components/UserForm";
import LoadingScreen from "@/components/common/loading/LoadingScreen";
import useSnackBar from "@/components/partials/SnackBar/hooks/useSnackBar";
import { base64ToFile, fileToBase64 } from "@/lib/utils/fileTransformers";
import { ModalContext } from "@/components/partials/Modal/context/ModalContext";
import useAlertDialog from "@/components/partials/AlertDialog/hooks/useAlertDialog";
import { ApiError, UnauthorizedClientError } from "@/lib/types/errors";
import { signOut } from "next-auth/react";
import { routes } from "@/lib/config/routes";
import { errorClientHandling } from "@/lib/utils/errorClientHandling";

export const UserFormContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const {
    entityId: userId,
    contentRef,
    handleCloseModal,
  } = useContext(ModalContext);
  const { openSnackBar } = useSnackBar();
  const { openAlertDialog } = useAlertDialog();
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
          isActive: undefined,
          isConfirmed: undefined,
        },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateUser | UpdateUser>(formOptions);
  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit = async (user: CreateUser | UpdateUser) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let response: ApiError;
      if (!userId) {
        const {
          username,
          password,
          email,
          name,
          lastnames,
          phoneNumber,
          image: file,
          role,
        } = user as CreateUser;

        response = await createUser({
          name,
          lastnames,
          username,
          password,
          role: (role as unknown as Item).value,
          phoneNumber,
          email,
          image: file ? await fileToBase64(file) : null,
        });
        errorClientHandling(response);
        openSnackBar("Usuario creado con éxito", "success");
      } else {
        const {
          username,
          email,
          name,
          lastnames,
          phoneNumber,
          image: file,
          isActive,
          isConfirmed,
          role,
        } = user as UpdateUser;
        response = await updateUser(userId, {
          name,
          lastnames,
          username,
          role: (role as unknown as Item).value,
          phoneNumber,
          email,
          image: file ? await fileToBase64(file) : null,
          isActive,
          isConfirmed,
        });
        errorClientHandling(response);
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
          image: user.image ? base64ToFile(user.image, user.username) : null,
          isActive: user.isActive,
          isConfirmed: user.isConfirmed,
          role: roles.find((role) => role.value === user.role),
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
