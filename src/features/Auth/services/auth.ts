import { AxiosError } from "axios";
import endPoints from "../../../config/endpoints.ts";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import axiosInstance from "../../../config/axiosInstance.ts";

export interface IdentityUser {
  id?: string;
  userName?: string;
  email?: string;
  emailConfirmed?: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: Date;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  securityStamp?: string;
  concurrencyStamp?: string;
  normalizedUserName?: string;
  normalizedEmail?: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  status?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserApp extends IdentityUser {
  storeId?: string;
  lastName?: string;
  name?: string;
  status?: string[];
  roles?: string[];
  password?: string;
  rowVersion?: number;
}

export interface LoginDTO {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginDto {
  email: string | undefined;
  password: string | undefined;
}

export interface ForgotPasswordDto {
  email?: string | undefined;
  password?: string | undefined;
  token?: string | undefined;
  userId?: string | undefined;
}

export interface ForgotPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export interface ResponseDto<T> {
  data: T | null; // Generic type for the data property
  status: number;
  isSuccess: boolean;
  message: string;
}

interface ValidationError {
  PasswordTooShort: string[];
  PasswordRequiresNonAlphanumeric: string[];
  PasswordRequiresDigit: string[];
  PasswordRequiresUpper: string[];
  DuplicateUserName: string[];
  PasswordRequiresLower: string[];
  InvalidToken: string[];
}

export interface ErrorResponseDto {
  type: string;
  title: string;
  status: number;
  errors: ValidationError;
}

export interface ErrorCreatedUser {
  succeeded: boolean;
  errors: [];
}

export interface loginResponseDto {
  id: string;
  email: string;
  accessToken: string;
  rol?: string;
}

export const validationErrorTranslations: Record<
  keyof ValidationError,
  string
> = {
  PasswordTooShort: "La contraseña debe tener al menos 6 caracteres.",
  PasswordRequiresNonAlphanumeric:
    "La contraseña debe contener al menos un carácter no alfanumérico.",
  PasswordRequiresDigit:
    "La contraseña debe contener al menos un dígito ('0'-'9').",
  PasswordRequiresUpper:
    "La contraseña debe contener al menos una letra mayúscula ('A'-'Z').",
  PasswordRequiresLower:
    "La contraseña debe contener al menos una letra minúscula ('a'-'z').",
  DuplicateUserName: "Ese Correo electronico ya está en registrado.",
  InvalidToken: "El Token ya expiro. Solicita cambio de contraseña nuevamente",
};

export const useLoginMutation = (): UseMutationResult<
  ResponseDto<loginResponseDto>,
  ErrorResponseDto,
  LoginDto,
  unknown
> => {
  return useMutation(async (user: LoginDto) => {
    const response = await axiosInstance.post(endPoints.auth.login, user);
    console.log(response.data);
    if (response.data.status == 200) {
      console.log(response.data);
      return response.data;
    }
    return response.data;
  });
};

export const useSignUpMutation = (): UseMutationResult<
  UserApp,
  ResponseDto<UserApp>, // Ajusta el tipo de respuesta según tu API
  UserApp,
  unknown
> => {
  return useMutation(async (user: UserApp) => {
    const { email, password } = user;
    const signUpResponse = await axiosInstance.post(endPoints.auth.signUp, {
      email,
      password,
    });
    return signUpResponse.data; // Retorna la respuesta de signUp
  });
};

export const useCreateUserMutation = (): UseMutationResult<
  ResponseDto<UserApp>, // Ajusta el tipo de respuesta según tu API
  AxiosError<ResponseDto<ErrorCreatedUser>>,
  UserApp,
  unknown
> => {
  return useMutation(
    async (user: UserApp) => {
      const response = await axiosInstance.post(
        endPoints.auth.createUser,
        user,
      );
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error al crear el usuario:", error);
      },
      onSuccess: (data) => {
        console.log("Usuario creado exitosamente:", data);
      },
    },
  );
};

export const useVerifyEmailQuery = (
  userId: string | undefined,
  finalToken: string | undefined,
): UseQueryResult<ResponseDto<unknown>, ResponseDto<any>> => {
  return useQuery(
    ["verifyEmail", userId, finalToken], // Unique query key for caching
    async () => {
      const url = endPoints.auth.verifyEmail(userId, finalToken);
      const response = await axiosInstance.get(url);
      return response.data;
    },
    {
      // Optional configuration options
      enabled: !!userId && !!finalToken, // Only fetch if both params are available
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error verifying email:", error);
      },
      onSuccess: (data) => {
        console.log("Email verification successful:", data);
      },
      // ... other options like retry, staleTime, etc.
    },
  );
};

export const useForgotPasswordMutation = (): UseMutationResult<
  ResponseDto<any>,
  unknown, // Error type (adjust if needed)
  ForgotPasswordDto,
  unknown // Context type (optional)
> => {
  return useMutation(
    async (forgotPasswordData: ForgotPasswordDto) => {
      const response = await axiosInstance.post(
        endPoints.auth.forgotPassword, // Update to match your API endpoint
        forgotPasswordData,
      );
      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error requesting password reset:", error);
      },
      onSuccess: (data) => {
        console.log("Password reset request successful:", data);
        // Optionally, add a notification or feedback to the user
      },
    },
  );
};

export const useResetPasswordMutation = (): UseMutationResult<
  ResponseDto<any>,
  ResponseDto<null>, // Error type (adjust if needed)
  ForgotPasswordDto,
  unknown // Context type (optional)
> => {
  return useMutation(
    async (forgotPasswordData: ForgotPasswordDto) => {
      const response = await axiosInstance.post(
        endPoints.auth.confirmResetPassword, // Update to match your API endpoint
        forgotPasswordData,
      );
      console.log({ resp: response.data });

      return response.data;
    },
    {
      onError: (error) => {
        console.error("Error requesting password reset:", error);
      },
      onSuccess: (data) => {
        console.log("Password reset request successful:", data);
      },
    },
  );
};
