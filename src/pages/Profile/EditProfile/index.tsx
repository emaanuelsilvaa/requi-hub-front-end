import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuBar from "../../../components/MenuBar";
import withAuth from "../../../components/withAuth";
import { Container } from "./styles";
import React,{useEffect, useState} from 'react';
import api from "../../../services/api";
import { getUseEmail, setNewPhoto } from "../../../services/auth";
import { Form } from "./styles";
import Grow from "@mui/material/Grow";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


export interface Profile { 
    id: string
    firstName: string
    lastName: string
    about: string
    email: string
    profilePhoto: any
  }

  const style = {
    "& label.Mui-focused": {
      color: "#7B1026"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#7B1026"
      }
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7B1026"
    },
    width: '400px',
    mt: 2
  }

function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const EditProfile = () => {

    const navigate = useNavigate();
    const [openUpdateProfileBackDrop, setOpenUpdateProfileBackDrop] = React.useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const [profileInfo, setProfileInfo] = React.useState<Profile | null>(null);
    const [ selectedProfileAvatar, setSelectedProfileAvatar ] = useState<any>()


    async function getAnsProfile(){
        /* inserir trycatch */
        let output = await api.get("/api/v1/users/email?email="+getUseEmail());
        console.log(output);
        setNewPhoto(output.data.profilePhoto);
        return setProfileInfo(output.data);
      };
      useEffect(() => {
        getAnsProfile();
      },[])

      const changeFileHandler= async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedProfileAvatar(e.target.files[0]);
    }

    const handleUpdateProfile = async e  => {
        e.preventDefault();

        if(selectedProfileAvatar){
            console.log("IDENTIFICOU QUE TEVE ALTERAÇÃO NA IMAGEM");
            const base64 = await convertBase64(selectedProfileAvatar);
            setProfileInfo( {...profileInfo, profilePhoto: base64  } )
            setNewPhoto(base64);
            window.location.reload();
        }else{
            try{
                const profile = {
                    id: profileInfo.id,
                    firstName: profileInfo.firstName,
                    lastName: profileInfo.lastName ,
                    about: profileInfo.about ,
                    email: profileInfo.email ,
                    profilePhoto: profileInfo.profilePhoto
                    
                }
                setOpenUpdateProfileBackDrop(!openUpdateProfileBackDrop)
                const response = await api.put("/api/v1/users/update", profile ).then(response => {
                    setOpenUpdateProfileBackDrop(openUpdateProfileBackDrop)
                    setOpenSnackBar(true);
                    window.location.reload();
                })
                
            }
            catch(err){
                if(err.response.status === 500){
                    console.log("ERRO 500");
                    localStorage.removeItem("@requiHub-Token");
                    setOpenUpdateProfileBackDrop(openUpdateProfileBackDrop)
                    setOpenSnackBar(true);
                    await timeout(3000);
                    navigate('/Login');
                }  
            }
        }
        
    }
    
    const convertBase64=(file) => {
        return new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload= () => {
                const profile = {
                    id: profileInfo.id,
                    firstName: profileInfo.firstName,
                    lastName: profileInfo.lastName ,
                    about: profileInfo.about ,
                    email: profileInfo.email ,
                    profilePhoto: fileReader.result
                    
                }
                setOpenUpdateProfileBackDrop(!openUpdateProfileBackDrop)
                const response = api.put("/api/v1/users/update", profile ).then(response => {
                    setOpenUpdateProfileBackDrop(openUpdateProfileBackDrop)
                    setOpenSnackBar(true);
                    setNewPhoto(response.data.profilePhoto)

                })
                //resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    
    const handleClose = () => {
    };

    
    return(
        <Container sx={{ flexGrow: 1 }}>
            <MenuBar/>
            <Grow in={true} timeout={600}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '40vh' }}
                >
                    
                    <Typography mt={4} fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}>
                    Editar perfil</Typography>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        borderRadius: 1,
                        }}
                    >
                        <Avatar sx={{ width: 154, height: 154, margin: 1 }} alt="Remy Sharp" src={ selectedProfileAvatar ? URL.createObjectURL(selectedProfileAvatar) : profileInfo && `${profileInfo.profilePhoto }`} />
                        <Grid spacing={0} container alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }}>
                            <Button variant="outlined" component="label" sx={{bgcolor: '#7B1026', textTransform: 'none', color: '#fff', borderRadius: '3px'}}>
                                Aterar
                                <input hidden accept="image/*" multiple type="file" onChange={changeFileHandler}  />
                            </Button>
                        </Grid>
                    </Box>
                    
                    {profileInfo && (
                    <TextField
                        id="outlined-helperText"
                        label="Primeiro nome"
                        defaultValue="Default Value"
                        value={profileInfo.firstName && profileInfo.firstName} sx={style} onChange={e => setProfileInfo({...profileInfo, firstName:e.target.value }) }
                    />
                    )}
                    {profileInfo && (
                    <TextField
                        id="outlined-helperText"
                        label="Ultimo nome"
                        defaultValue="Default Value"
                        value={profileInfo.lastName && profileInfo.lastName} sx={style} onChange={e => setProfileInfo({...profileInfo, lastName: e.target.value }) }
                    />
                    )}
                    
                    {profileInfo && (
                    
                    <TextField
                        id="outlined-multiline-static"
                        label="Sobre"
                        multiline
                        margin='normal'
                        style = {{width: 400}}
                        maxRows={20}
                        size={"small"}
                        sx={style}
                        rows={3}
                        defaultValue={profileInfo.about && profileInfo.about}
                        onChange={e => setProfileInfo({...profileInfo, about: e.target.value }) }
                        />
                    )}
                    <Form onSubmit={handleUpdateProfile}>
                    <button style={{cursor: 'pointer'}} type="submit">Salvar</button>
                    </Form> 
                
                </Grid>
            </Grow>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openUpdateProfileBackDrop}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Catalogo Cadastrado com Sucesso
                </Alert>
            </Snackbar>  
        </Container>
        
    );

}

export default withAuth(EditProfile);