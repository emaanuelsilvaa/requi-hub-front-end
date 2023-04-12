import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuBar from "../../../components/MenuBar";
import withAuth from "../../../components/withAuth";
import { Container } from "./styles";


const EditProfile = () => {
    
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
                    <Avatar sx={{ width: 104, height: 104, margin: 1 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    <Grid spacing={0} container alignItems="center" justifyContent="center" style={{ minHeight: '20vh' }}>
                        <Button variant="outlined" component="label" sx={{bgcolor: '#cdcdcd', textTransform: 'none'}}>
                            Aterar
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </Grid>
                </Box>
                
                <TextField id="standard-basic" label="Nome" variant="standard" placeholder="Sua senha" style = {{width: 400}} onChange={e => true }/>
                <TextField
                    id="outlined-multiline-static"
                    label="Sobre"
                    multiline
                    margin='normal'
                    style = {{width: 400}}
                    maxRows={20}
                    size={"small"}
                    rows={3}
                    defaultValue="Default Value"/>
                <button>Salvar <input hidden accept="image/*" multiple type="file" /></button>
            </Grid>
        </Container>
        
    );

}

export default withAuth(EditProfile);