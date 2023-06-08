import React, { useState } from "react";
import { Link, Navigate  } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Box } from "@mui/material";
import { Form, Container } from "./styles";


const RecoveryPassword = () => {
    
    return(
        <Box>
            <p>PAGINA RECUPERAR SENHA</p>
        </Box>
    );
}


export default RecoveryPassword;