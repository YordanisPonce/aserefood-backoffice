"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm, UseFormProps } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useUrlParams from "@/lib/hooks/useUrlParams";
import { revalidateServerTags } from "@/lib/utils/cache";
import { createUserSchema } from "../utils/schema";
import { CreateUser, CreateUserDTO } from "@/lib/types/users";
import { createUser } from "@/lib/services/user";
import { CreateUserForm } from "../components/CreateUserForm";

type AddUserContainerProps = {
  currentModal?: string;
};

export const AddUserContainer: FunctionComponent<
AddUserContainerProps
> = ({ currentModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateSearchParams } = useUrlParams();

  const formOptions: UseFormProps<CreateUser> = {
    resolver: zodResolver(createUserSchema()),
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
      lastnames: undefined,
      phoneNumber: undefined,
      username: undefined,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  };
  const methods = useForm<CreateUser>(formOptions);

  const handleCloseModal = () => {
    updateSearchParams({
      currentModal: {
        action: "delete",
        value: "",
      },
    });
    methods.reset();
  };

  const onSubmit = async ({
    name,
    lastnames,
    username,
    password,
    phoneNumber,
    email
  }: CreateUser) => {
    setIsLoading(true);
    try {
      const createUserDto: CreateUserDTO = {
        name,
        lastnames,
        username,
        password,
        role: "customer", // defualt value
        phoneNumber,
        email
      };
      await createUser(createUserDto);
      await revalidateServerTags("users");
      handleCloseModal();
      methods.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={currentModal === "create-user"}
      maxWidth={"md"}
      fullWidth
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">Crear Usuario </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            action="#"
            onSubmit={methods.handleSubmit(onSubmit)}
            onReset={handleCloseModal}
            autoComplete="off"
            className="relative z-10"
          >
            <CreateUserForm isLoading={isLoading} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
