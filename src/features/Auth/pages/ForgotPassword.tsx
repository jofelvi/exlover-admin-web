import "./login.css";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";
import {
  ForgotPasswordDto,
  useForgotPasswordMutation,
} from "../services/auth.ts";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../store/modal/modalSlice.ts";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutate: forgotPassword,
    isLoading,
    isSuccess,
  } = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>();

  useEffect(() => {
    isSuccess && handleOpenModal();
  }, [isSuccess]);

  const onSubmit = async (data: ForgotPasswordDto) => {
    forgotPassword(data);
  };

  const handleBtnCloseModal = () => {
    dispatch(closeModal());
    navigate("/login");
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        tittle: "Restauracion de contraseña",
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
      <div>
        Se envio un correo electronico con el link para cambiar su contraseña.
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
            <h2>
              Restaurar contraseña{" "}
              <LockOutlinedIcon style={{ paddingTop: 15 }} />
            </h2>

            <div className="input-group">
              <TextField
                margin="normal"
                required
                fullWidth
                label="Correo Electronico"
                type="email"
                {...register("email", { required: true })}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Enviando Correo..." : "Enviar"}
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

export default ForgotPassword;
