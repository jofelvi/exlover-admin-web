import * as yup from "yup"; // Import Yup

export const forgotPasswordSchema = yup.object({
  newPassword: yup.string().required("La nueva contraseña es obligatoria"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas deben coincidir")
    .required("Confirma la contraseña"),
});
