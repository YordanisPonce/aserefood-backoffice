"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createUserSchema, updateUserSchema } from "../utils/schema";
import { CreateUser, UpdateUser } from "@/lib/types/users";
import { createUser, getUser, updateUser } from "@/lib/services/user";
import { UserForm } from "../components/UserForm";
import useModal from "@/components/partials/Modal/hooks/useModal";
import LoadingScreen from "@/components/common/loading/LoadingScreen";

export const UserFormContainer: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { entityId: userId, handleCloseModal } = useModal();
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
        }
      : {
          name: undefined,
          email: undefined,
          lastnames: undefined,
          phoneNumber: undefined,
          username: undefined,
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
        const { username, password, email, name, lastnames, phoneNumber } =
          user as CreateUser;
        await createUser({
          name,
          lastnames,
          username,
          password,
          role: "customer", // defualt value
          phoneNumber,
          email,
        });
      } else {
        const { username, email, name, lastnames, phoneNumber } =
          user as UpdateUser;
        await updateUser(userId, {
          name,
          lastnames,
          username,
          role: "customer", // defualt value
          phoneNumber,
          email,
        });
      }
      await revalidateServerTags("users");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
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
  }, []);

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
