import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  exp?: number;
}

const isTokenValid = (token: string): boolean => {
  try {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode<CustomJwtPayload>(token);
    if (!decoded.exp) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Token is invalid", error);
    return false;
  }
};

export default isTokenValid;
