import { TextFieldProps } from "@mui/material";
import { FieldError, useFormContext } from "react-hook-form";
import { StyledTextField } from "../styleComponents/sharedForm.tsx";

type InputFieldProps<T extends string> = TextFieldProps & {
  name: string;
  type?: T;
};

const UseInputTextField = <T extends string>({
  name,
  label,
  type,
  ...rest
}: InputFieldProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name] as FieldError | undefined; // Afirmación de tipo para mayor claridad

  return (
    <StyledTextField
      label={label}
      type={type}
      {...register(name)}
      error={!!fieldError}
      helperText={
        fieldError ? (
          <span>
            {typeof fieldError.message === "string"
              ? fieldError.message
              : JSON.stringify(fieldError.message)}
          </span>
        ) : null
      }
      fullWidth
      //margin="normal"
      {...rest}
    />
  );
};

export default UseInputTextField;
