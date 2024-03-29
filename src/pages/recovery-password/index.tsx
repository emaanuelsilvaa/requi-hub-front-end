import React, { useState } from "react";
import { Link, Navigate  } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";
import { Alert, Backdrop, Box, CircularProgress, Divider, Snackbar, TextField, Typography } from "@mui/material";
import { Form, Container } from "./styles";
import MenuBar from "../../components/MenuBar";
import LinkMui from '@mui/material/Link';


function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}


const style = {
    "& label.Mui-focused": {
      color: "#4B3D3D"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#4B3D3D"
      }
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#4B3D3D"
    },
  }

const RecoveryPassword = () => {

    const [ email, setEmail ] = useState("");
    const [ redirect, setRedirect ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [ error, setError ] = useState("");


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        event.preventDefault();
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
        setRedirect(true);
      };
      

    const handleSignIn = async e => {
        e.preventDefault();

        if (!email) {
            setError("Preencha e-mail para continuar!");
        }
        else{
            try {
            setOpen(!open);
            const response = await api.post("/api/v1/public/auth/forgot-password", { email });
            await timeout(1000);
            setOpen(false);
            setOpen1(true);
            //alert("Solicitação de recuperação realizada com sucesso. cheque seu email para seguir com a solicitação."); 
            }
            catch (error) {
                alert(error.response.data.message);
            } finally {
            }
        }
    };

    
    return(
        <Box>
            <MenuBar/>
        <Box
          sx={{
            maxWidth: 1200,
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 10,
            bgcolor: '#eee',
            borderRadius: 1,
          }}
        >
          <Form onSubmit={handleSignIn}>
            <h1>Recuperar Senha</h1>
            <a>Digite o email cadastrado em sua conta </a>
            {error && <p>{error}</p>}
            <TextField id="standard-basic" sx={style} label="Endereço de e-mail" variant="standard" onChange={e => setEmail(e.target.value) } />
            <button type="submit">Enviar</button>
            <hr />
            {redirect && <Navigate to='/Login' replace={true}/>}
          </Form>
          <Divider sx={{ m: 4, backgroundColor: '#818E9B'}} orientation="vertical" flexItem/>
          <Typography
            variant="h6"
            sx={{
              m: 20,
              flexGrow: 1,
              fontFamily: 'Poppins',
              fontWeight: 1000,
              color: '#7B1026',
              textDecoration: 'none',
            }}
          >
           <LinkMui underline={"none"} href="/homeV2" sx={{bgcolor: '#eee', color:'#7B1026;'}}>
              RequiHub
            </LinkMui>
          </Typography>
        </Box>
        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Solicitação de recuperação realizada com sucesso. cheque seu email para seguir com a solicitação.
          </Alert>
        </Snackbar>
        </Box>
    );
}


export default RecoveryPassword;