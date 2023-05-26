import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuBar from "../../../components/MenuBar";
import withAuth from "../../../components/withAuth";
import { Container } from "./styles";
import React,{useEffect} from 'react';
import api from "../../../services/api";
import { getUserId, getUseEmail } from "../../../services/auth";
import { Form } from "./styles";


export interface Profile { 
    id: string
    firstName: string
    lastName: string
    about: string
    email: string
    profilePhoto: string
  }

const EditProfile = () => {

    const [profileInfo, setProfileInfo] = React.useState<Profile | null>(null);


    async function getAnsProfile(){
        /* inserir trycatch */
        let output = await api.get("/api/v1/users/email?email="+getUseEmail());
        console.log(output);
        return setProfileInfo(output.data);
      };
      useEffect(() => {
        getAnsProfile();
      },[])
    
    return(
        <Container sx={{ flexGrow: 1 }}>
            <MenuBar/>
            
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
                    <Avatar sx={{ width: 154, height: 154, margin: 1 }} alt="Remy Sharp" src={profileInfo && `${ 'data:image/png;base64,'+profileInfo.profilePhoto }`} />
                    <Grid spacing={0} container alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }}>
                        <Button variant="outlined" component="label" sx={{bgcolor: '#7B1026', textTransform: 'none', color: '#fff', borderRadius: '3px'}}>
                            Aterar
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>
                </Box>
                
                {profileInfo && (
                <TextField
                    id="outlined-helperText"
                    label="Primeiro nome"
                    defaultValue="Default Value"
                    value={profileInfo.firstName && profileInfo.firstName} style = {{width: 400}} onChange={e => true }
                />
                )}
                {profileInfo && (
                <TextField
                    id="outlined-helperText"
                    label="Ultimo nome"
                    defaultValue="Default Value"
                    value={profileInfo.lastName && profileInfo.lastName} sx={{width: 400, mt: 2}} onChange={e => true }
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
                    rows={3}
                    defaultValue={profileInfo.about && profileInfo.about}/>
                )}
                <Form>
                <button>Salvar <input hidden accept="image/*" multiple type="file" /></button>
                </Form>
            </Grid>
        </Container>
        
    );

}

export default withAuth(EditProfile);