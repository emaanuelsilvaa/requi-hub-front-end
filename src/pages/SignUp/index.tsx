import React, { useState } from "react";
import { Link  } from "react-router-dom";
import api from "../../services/api";
import LinkMui from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import { Form, Container } from "./styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MenuBar from '../../components/MenuBar';

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
  const [ error, setError ] = useState("");

  const handleSignUp = async e => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError( "Preencha todos os dados para se cadastrar");
    } else {
        try {
        await api.post("/api/v1/auth/authenticate", { firstName, lastName, email, password });
        <Link to="/">Fazer login</Link>
        } catch (err) {
        console.log(err);
        setError("Ocorreu um erro ao registrar sua conta.");
        }
    }
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 1,
        m: 1,
        bgcolor: '#eee',
        borderRadius: 1,
      }}
    >
      
      <Form onSubmit={handleSignUp}>
        <h1>Cadastro</h1>
        {error && <p>{error}</p>}
        <TextField id="standard-basic" sx={style} placeholder="Seu nome"  label="Nome Completo" variant="standard" onChange={e => setEmail(e.target.value) } />
        <TextField id="standard-basic" sx={style} placeholder="meuEmail@exemplo.com" label="Seu Email" variant="standard" onChange={e => setEmail(e.target.value) } />
        <TextField
          sx={style}
          id="standard-textarea"
          label="Sobre"
          placeholder="Uma breve descrição sobre você"
          multiline
          variant="standard"
        />
        <TextField id="standard-basic" sx={style} type="password" label="Senha" variant="standard" placeholder="Sua senha"
          onChange={e => setEmail(e.target.value) }
        />
        <TextField id="standard-basic" sx={style} type="password" label="Repita sua Senha" variant="standard" placeholder="Sua senha"
          onChange={e => setEmail(e.target.value) } 
        />
        <button type="submit">Cadastrar</button>
        <hr />
        <Link to="/Login">Ou fazer login com</Link>
      </Form>
      <Divider sx={{ m: 4, backgroundColor: '#818E9B'}} orientation="vertical" flexItem/>
      <Typography
        variant="h6"
        sx={{
          m: 23,
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
      
    </Container>
  );
}

export default SignUp;