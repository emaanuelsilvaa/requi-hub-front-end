import React, { useState } from "react";
import { Link, Navigate  } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

/** Material UI Imports */
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LinkMui from '@mui/material/Link';

import { Form, Container } from "./styles";

import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import MenuBar from "../../components/MenuBar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
const SignIn = () => {

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");
  const [ redirect, setRedirect ] = useState(false);
  const [ open, setOpen ] = useState(false);

  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen1(false);
  };
  

  const handleSignIn = async e => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        setOpen(!open);
        const response = await api.post("/api/v1/public/auth/authenticate", { email, password });
        login(response.data);
        console.log(response.headers);
        setOpen(false);
        handleClick();
        await timeout(1000);
        setRedirect(true);
      } catch (err) {
        setOpen(false);
        setError("Houve um problema com o login, verifique suas credenciais.");
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
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
            <h1>Entrar</h1>
            <a>Não possui uma conta ? <Link to="/Cadastro">Criar conta grátis.</Link>  </a>
            {error && <p>{error}</p>}
            <TextField id="standard-basic" sx={style} label="Endereço de e-mail" variant="standard" onChange={e => setEmail(e.target.value) } />
            <TextField id="standard-basic" type="password" sx={style}  label="Senha" variant="standard" onChange={e => setPassword(e.target.value)}  />
            <a>Esqueceu a senha ? <Link to="/recuperar-senha">clique aqui !</Link> </a>
            <button type="submit">Entrar</button>
            <hr />
            {redirect && <Navigate to='/profile/:name' replace={true}/>}
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
            Login Realizado com sucesso !
          </Alert>
        </Snackbar>
    </Box>
  );
}

export default SignIn;