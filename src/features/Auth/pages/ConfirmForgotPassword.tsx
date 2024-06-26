import "./login.css";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/HooksRedux.ts";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";
import {
  ForgotPasswordDto,
  ForgotPasswordForm,
  useResetPasswordMutation,
  validationErrorTranslations,
} from "../services/auth.ts";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { closeModal, openModal } from "../../../store/modal/modalSlice.ts";

const forgotPasswordSchema = yup.object({
  newPassword: yup.string().required("La nueva contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas deben coincidir")
    .required("Confirma la contraseña"),
});

const ConfirmForgotPassword = () => {
  const { userId, token } = useParams(); // Get parameters from URL
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading, data } = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema), // Use Yup resolver
  });

  useEffect(() => {
    console.log({ data });
    data?.status === 200 && handleSuccessToast();
    handleErrorToast();
  }, [data]);

  const handleErrorToast = () => {
    if (data && !data.isSuccess && data.data && Array.isArray(data.data)) {
      data.data.forEach((errorItem) => {
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

  const handleSuccessToast = () => {
    toast.success("Contraseña cambiada exitosamente sera redirigido en breve");
    handleOpenModal();
  };

  const onSubmit = async (data: ForgotPasswordForm) => {
    const forgotPasswordData: ForgotPasswordDto = {
      token,
      userId,
      password: data.newPassword,
    };
    resetPassword(forgotPasswordData);
  };

  const handleBtnCloseModal = () => {
    dispatch(closeModal());
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: "Cambio de Contraseña Exitoso",
        content: bodyModal,
        accions: (
          <>
            <Button onClick={() => handleBtnCloseModal()}>Aceptar</Button>
          </>
        ),
      }),
    );
  };

  const bodyModal = (
    <div>
      <div>Su cambio de contraseña se realizo con exito.</div>
    </div>
  );

  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content">
            <ToastContainer />
            <h2>
              Ingrese contraseña <LockOutlinedIcon style={{ paddingTop: 15 }} />
            </h2>

            <div className="input-group">
              <TextField
                label="Nueva Contraseña"
                type="password"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                autoComplete="new-password"
                required
                fullWidth
                margin="normal"
              />
            </div>

            <div className="input-group">
              <TextField
                label="Confirmar Nueva Contraseña"
                type="password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                autoComplete="new-password"
                required
                fullWidth
                margin="normal"
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Cargando.." : "Cambiar"}
            </Button>

            <div className="links">
              <Link to="/login">¿Tienes Cuenta? Ingresa aca</Link>
              <Link to="/signup">¿No tienes cuenta? Crea una</Link>
            </div>
            <Copyright sx={{ mt: 5 }} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmForgotPassword;
