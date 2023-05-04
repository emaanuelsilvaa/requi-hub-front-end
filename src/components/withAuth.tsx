import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { Navigate  } from "react-router-dom";
export const TOKEN_KEY = "@requiHub-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;



const withAuth = (Component) => {

  const handleClose = () => {
    return <Navigate to={'/'} />
  };

    const AuthRoute = () => {
      if (isAuthenticated()) {
        return <Component />;
      } else {
        return <Navigate to="/Login" replace />
      
         
        // return  <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        //           <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        //           Sessão Expirada ! Faça Login novamente
        //           </Alert>
        //         </Snackbar>
        
        
      }
    };
  
    return AuthRoute;
  };
  export default withAuth;