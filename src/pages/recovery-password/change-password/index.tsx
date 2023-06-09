import { useState } from "react";
import MenuBar from "../../../components/MenuBar";
import { Alert, Backdrop, Box, CircularProgress, Divider, Snackbar, TextField, Typography } from "@mui/material";
import LinkMui from '@mui/material/Link';
import { Form } from "./styles";
import { Navigate  } from "react-router-dom";
import api from "../../../services/api";
import { useSearchParams } from "react-router-dom";


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

const ChangePassword = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [ password, setPassword ] = useState("");
    const [ passwordRepeated, setPasswordRepeated ] = useState("");
    const [ redirect, setRedirect ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [ error, setError ] = useState("");


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        event.preventDefault();
        setOpen1(false);
        setRedirect(true);
        if (reason === 'clickaway') {
          return;
        }  
      };
      

    const handleChangePassword = async e => {
        e.preventDefault();

        const authResult = new URLSearchParams(window.location.search); 
        const token = authResult.get('token')

        if (!password || !passwordRepeated) {
            setError("Preencha os campos para continuar!");
        }
        else if (password != passwordRepeated) {
            setError("As duas senhas devem ser iguais");
        }
        else{
            try {
                setOpen(!open);
                const response = await api.post("/api/v1/public/auth/change-password", { password,token });
                setOpen(false);
                setOpen1(true);
                }
                catch (error) {
                    alert(error.response.data.message);
                    setOpen(false);
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
          <Form onSubmit={handleChangePassword}>
            <h1>Recuperar Senha</h1>
            <a>Digite Sua nova senha </a>
            {error && <p>{error}</p>}
            <TextField id="standard-basic" sx={style} type="password" label="Nova Senha" variant="standard" onChange={e => setPassword(e.target.value) } />
            <TextField id="standard-basic" sx={style} type="password" label="Repita Sua Nova Senha" variant="standard" onChange={e => setPasswordRepeated(e.target.value) } />
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
            Senha alterada com sucesso !
          </Alert>
        </Snackbar>

        </Box>        
    );


}

export default ChangePassword;