import { useAppSelector } from "../../../store/HooksRedux.ts";

const useAuth = () => {
  const authState = useAppSelector((state) => state.auth);
  return {
    isAuth: authState.isAuthenticated,
    user: authState.user,
  };
};

export default useAuth;
