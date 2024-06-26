import { JwtPayload, verify } from "jsonwebtoken";

const SECRET_KEY = "[OdinSysServer2024TokenForJwtSave]";

export const verificarTokenYDecodificar = (
  token: string,
): JwtPayload | null => {
  try {
    const decodedToken = verify(token, SECRET_KEY) as JwtPayload;

    const validToken = validateVigentToken(decodedToken);
    if (!validToken) {
      return null;
    }

    console.log({ token });
    return decodedToken || null;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return null;
  }
};

export const validateVigentToken = (decodedToken: JwtPayload): boolean => {
  const ahora = new Date().getTime() / 1000;
  return decodedToken.exp && decodedToken.exp > ahora ? true : false;
};
