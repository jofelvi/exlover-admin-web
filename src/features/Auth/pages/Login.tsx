import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/HooksRedux.ts";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginReduces } from "../slices/authSlice.ts";
import { LoginDto, useLoginMutation } from "../services/auth.ts";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import {
  StyledButton,
  StyledTextField,
} from "../../SharedComponents/styleComponents/sharedForm.tsx";
import { CopyrightCustom } from "../../SharedComponents/copyRight/Copyright.tsx";
import logoTila from "../../../assets/logo-light.png";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>();

  const onSubmit = async (data: LoginDto) => {
    try {
      mutate(data, {
        onSuccess: (loginData) => {
          setTimeout(() => {
            navigate("/");
            console.log({ loginData });
            if (loginData.data) {
              const user = {
                id: loginData.data.id,
                email: loginData.data.email,
              };

              dispatch(
                loginReduces({ user: user, token: loginData.data.accessToken }),
              );

              localStorage.setItem("access_token", loginData.data.accessToken);
              localStorage.setItem("userId", loginData.data.id);
              localStorage.setItem("email", loginData.data.email);
            }
          }, 1000);
        },
        onError: (error: any) => {
          console.error(
            "Error al iniciar sesión (Axios):",
            error.response.status,
            error.response.data,
          );
        },
      });
    } catch (error) {
      toast.error("Error inesperado al iniciar sesión");
      console.error("Unexpected error during login:", error);
    }
  };

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
              Entrar <LockOutlinedIcon style={{ paddingTop: 15 }} />
            </h2>

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
              />
            </div>

            {/*    <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            />*/}

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </StyledButton>

            <div className="links">
              {/*<Link to="/account/reset-password">
                ¿Olvidastes la contraseña?
              </Link>*/}
              <Link to="/signup">¿No tienes cuenta? Crea una</Link>
            </div>

            <CopyrightCustom />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
