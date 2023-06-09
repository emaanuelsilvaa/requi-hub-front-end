import React, { useState } from "react";
import { Link, Navigate  } from "react-router-dom";
import api from "../../services/api";
import LinkMui from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import { Form, Container } from "./styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuBar from '../../components/MenuBar';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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


const SignUp = () => {

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordRepeated, setPasswordRepeated ] = useState("");
  const [ sobre, setSobre ] = useState("");
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

  const handleSignUp = async e => {
    e.preventDefault();

    if( password != passwordRepeated){setError( "Digite a senha corretamente !");}
    else if (!firstName || !lastName || !email || !password || !sobre ) {
      setError( "Preencha todos os dados para se cadastrar");
    } else {

        try {
        setOpen(!open);
        const response = await api.post("/api/v1/public/auth/register", { firstName, lastName, email, password, sobre });
        setOpen(false);
        handleClick();
        setRedirect(true);
        } catch (err) {
        console.log(err);
        setOpen(false);
        setError(err.response.data.message);
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
        
        <Form onSubmit={handleSignUp}>
          <h1>Cadastro</h1>
          {error && <p>{error}</p>}
          <TextField id="standard-basic" sx={style} placeholder="Primeiro nome"  label="Primeiro nome" variant="standard" onChange={e => setFirstName(e.target.value) } />
          <TextField id="standard-basic" sx={style} placeholder="Ultimo nome"  label="Ultimo nome" variant="standard" onChange={e => setLastName(e.target.value) } />
          <TextField id="standard-basic" sx={style} placeholder="meuEmail@exemplo.com" label="Seu Email" variant="standard" onChange={e => setEmail(e.target.value) } />
          <TextField
            sx={style}
            id="standard-textarea"
            label="Sobre"
            placeholder="Uma breve descrição sobre você"
            multiline
            variant="standard"
            onChange={e => setSobre(e.target.value) }
          />
          <TextField id="standard-basic" sx={style} type="password" label="Senha" variant="standard" placeholder="Sua senha"
            onChange={e => setPassword(e.target.value) }
          />
          <TextField id="standard-basic" sx={style} type="password" label="Repita sua Senha" variant="standard" placeholder="Sua senha"
            onChange={e => setPasswordRepeated(e.target.value) } 
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <a>já possui login ? <Link to="/Login">Realizar login</Link> </a>
        </Form>
        {redirect && <Navigate to='/profile/:name' replace={true}/>}

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
            Cadastro Realizado com sucesso !
          </Alert>
        </Snackbar>
    </Box>
  );
}

export default SignUp;