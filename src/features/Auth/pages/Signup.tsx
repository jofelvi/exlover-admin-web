import "./login.css";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";
import { useAppDispatch } from "../../../store/HooksRedux.ts";

import {
  ErrorCreatedUser,
  ResponseDto,
  useCreateUserMutation,
  UserApp,
  validationErrorTranslations,
} from "../services/auth.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { AxiosError } from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeModal, openModal } from "../../../store/modal/modalSlice.ts";
import {
  StyledButton,
  StyledTextField,
} from "../../SharedComponents/styleComponents/sharedForm.tsx";
import { CopyrightCustom } from "../../SharedComponents/copyRight/Copyright.tsx";
import logoTila from "../../../assets/logo-light.png";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const signupSchema = yup.object({
  firstName: yup.string().required("El nombre es obligatorio"),
  lastName: yup.string().required("El apellido es obligatorio"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: yup
    .string()
    .min(6, validationErrorTranslations.PasswordTooShort)
    .matches(/[a-z]/, validationErrorTranslations.PasswordRequiresLower)
    .matches(/[A-Z]/, validationErrorTranslations.PasswordRequiresUpper)
    .matches(
      /[@$!%*?&]/,
      validationErrorTranslations.PasswordRequiresNonAlphanumeric,
    )
    .matches(/[0-9]/, validationErrorTranslations.PasswordRequiresDigit)
    .required("La contraseña es obligatoria"),
  phoneNumber: yup
    .string()
    .matches(
      /^04(12|14|16|24|26)[0-9]{7}$/,
      "El número de teléfono debe tener el formato 04XXXXXXXXX, es 12, 14, 16, 24 o 26.",
    )
    .required("El número de teléfono es obligatorio"),
});

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const {
    data: userCreated,
    mutateAsync: createUser,
    isError: errorCreateUser,
    isLoading,
    error,
  } = useCreateUserMutation();

  useEffect(() => {
    if (userCreated?.isSuccess) {
      handleOpenModal();
    }
  }, [userCreated]);

  useEffect(() => {
    if (errorCreateUser) {
      const errorResponse = error as AxiosError<ResponseDto<ErrorCreatedUser>>;
      handleErrorToast(errorResponse.response?.data.data?.errors);
    }
  }, [userCreated, errorCreateUser]);

  const handleErrorToast = (errorMsg: any) => {
    if (Array.isArray(errorMsg)) {
      errorMsg.forEach((errorItem) => {
        const translationKey =
          errorItem.code as keyof typeof validationErrorTranslations;
        if (validationErrorTranslations[translationKey]) {
          toast.error(validationErrorTranslations[translationKey]);
        } else {
          toast.error(`Error desconocido: ${errorItem.code}`);
        }
      });
    }
  };

  const handleBtnCloseModal = () => {
    dispatch(closeModal());
    navigate("/login");
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: "Confirmación de registro",
        content: bodyModal,
        accions: (
          <>
            <Button onClick={() => handleBtnCloseModal()}>Aceptar</Button>
          </>
        ),
      }),
    );
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const userData: UserApp = {
      ...data,
    };
    await createUser(userData);
  };

  const bodyModal = (
    <div>
      <div>
        ¡Bienvenido/a a nuestro OdinSys! su cuenta de correo electrónico se ha
        creado con éxito. Por favor siga los siguientes pasos.
      </div>
      <div style={{ marginTop: 10 }}>
        1. Verifica tu dirección de correo electrónico: Haz clic en el enlace de
        verificación que hemos enviado a tu bandeja de entrada.
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content">
            <ToastContainer />
            <div>
              <img width="80" src={logoTila} alt="tila" />
            </div>
            <h2>
              Crear Usuario Ex-lover{" "}
              <LockOutlinedIcon style={{ paddingTop: 15 }} />
            </h2>

            <div className="input-group">
              <StyledTextField
                margin="normal"
                required
                fullWidth
                label="Nombre"
                type="text"
                {...register("firstName", { required: true })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </div>
            <div className="input-group">
              <StyledTextField
                margin="normal"
                required
                fullWidth
                label="Apellido"
                type="text"
                {...register("lastName", { required: true })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>

            <div className="input-group">
              <StyledTextField
                margin="normal"
                required
                fullWidth
                label="Correo Electronico"
                type="email"
                {...register("email", { required: true })}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <StyledTextField
                label="Password"
                type="password"
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password?.message}
                autoComplete="current-password"
                required
                fullWidth
                margin="normal"
              />
            </div>

            <div className="input-group">
              <StyledTextField
                label="Teléfono"
                type="tel" // Cambiamos el tipo a 'tel'
                inputProps={{
                  inputMode: "numeric", // Solo permite entrada numérica en dispositivos móviles
                  pattern: "^04(12|14|16|24|26)[0-9]{7}$", // Validación con expresión regular
                }}
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^04(12|14|16|24|26)[0-9]{7}$/,
                    message:
                      "El número de teléfono debe tener el formato 04XX-XXXXXXX, donde XX es 12, 14, 16, 24 o 26.",
                  },
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                fullWidth
                margin="normal"
              />
            </div>

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Creando Cuenta..." : "Crear"}
            </StyledButton>

            <div className="links">
              <Link to="/">¿Olvidastes la contraseña?</Link>
              <Link to="/login">¿Tienes Cuenta? Ingresa aca</Link>
            </div>

            <CopyrightCustom />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
