import { Navigate  } from "react-router-dom";
export const TOKEN_KEY = "@requiHub-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const withAuth = (Component) => {
    const AuthRoute = () => {
      if (isAuthenticated()) {
        return <Component />;
      } else {
        return <Navigate to="/" />;
      }
    };
  
    return AuthRoute;
  };
  export default withAuth;