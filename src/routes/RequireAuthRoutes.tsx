
interface RequireAuthRoutesProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const RequireAuthRoutes = ({ children, allowedRoles  }: RequireAuthRoutesProps) => {
/*
  const {  user } = useAuth();
  const location = useLocation();
*/
  console.log(allowedRoles)
 /* if (allowedRoles.length && user && !allowedRoles.some(role => user.roles?.includes(role))) {
    return <Navigate to="/not-authorized" state={{ from: location }} replace />;
  }
*/
  return children
}

export default RequireAuthRoutes
