import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import {useNavigate } from 'react-router-dom';

import { Container } from "./styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const Profile = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const handleEditPerfil = () => {
    navigate('/profile/edit');
  }
  
  return (
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
          <Typography mt={4} mb={2} fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}>
            Perfil</Typography>
          <Avatar sx={{ width: 104, height: 104, margin: 1 }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          <Typography mt={1} fontFamily='Poppins' color={'#00000'} fontSize={20} align={"center"}>
                Nome do usuario
          </Typography>
          <Typography mt={1} fontFamily='Poppins' color={'#00000'} fontSize={20} align={"center"}>
                Bio
          </Typography>
          <Box mt={1}>
            <Button color="info" variant="outlined" onClick={() => handleEditPerfil()} >Editar Perfil </Button>
          </Box>    
          <Divider color="#7B1026" sx={{ m: 4}} orientation="horizontal" flexItem light> Criados</Divider>
      </Grid>
    
    </Container>
  );
};

export default withAuth(Profile);