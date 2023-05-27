import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import {useNavigate } from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import { Form, DragDropContainer } from "./styles";

import { getUserId, getUseEmail } from "../../services/auth";

import { Container } from "./styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Backdrop from "@mui/material/Backdrop";
import ListSubheader from "@mui/material/ListSubheader";

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Grow from '@mui/material/Grow';
import SearchField from '../../components/Search';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from "@mui/material/CircularProgress";

import FilterListIcon from '@mui/icons-material/FilterList';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import api from "../../services/api";
import { profile } from "console";


export interface Profile { 
  id: string
  firstName: string
  lastName: string
  about: string
  email: string
  profilePhoto: string
}

export interface Catalog { 
  id: string;
  title: string;
  description: string;
  attachment: any;
  categoryType: { type: string };
  representationTypeModel: {type: string};
  subjectTags: [];
}

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );}


const Profile = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const handleEditPerfil = () => {
    navigate('/profile/edit');
  }

  const formatImage = ( item : Catalog) => {
    var image = new Image();
    return image.src = 'data:image/png;base64,'+item.attachment.thumbnailLink;
  }

  const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openBackDropCatalogList, setOpenBackDropCatalogList] = React.useState(false);

    const [openSubMenu, setOpenSubMenu] = React.useState(true);

    const [catalog, setCatalog] = React.useState<Catalog | null>(null);

    const [profileInfo, setProfileInfo] = React.useState<Profile | null>(null);

    async function getAnsCatalogs(){
      /* inserir trycatch */
      let output = await api.get("api/v1/catalog/find/by/author?id="+getUserId());
      console.log(output);
      
      return setCatalog(output.data.content);
   
  };
  async function getAnsProfile(){
    /* inserir trycatch */
    let output = await api.get("/api/v1/users/email?email="+getUseEmail());
    console.log(output);
    return setProfileInfo(output.data);
  };
  useEffect(() => {
    getAnsCatalogs();
    getAnsProfile();
  },[])

    const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
    };

    const handleCard = (item : Catalog, e) => {
      navigate('/Catalogo' , { state: { id: item.id }});
    };

    const handleEditProfile = async e  => {
      e.preventDefault();
      navigate('/profile/edit' , { state: { id: getUseEmail() }});
    }

    const handleDeleteCatalog = async (item : Catalog, e) => {
      const response = await api.delete("/api/v1/catalog/delete?id="+item.id).then(response => {
        getAnsCatalogs()
        window.location.reload();
    })
    };

    const handleChangePage = async (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        console.log(catalog);
        console.log("teste"+newPage);
        setOpenBackDropCatalogList(true);
        await timeout(1000);
        setOpenBackDropCatalogList(false);
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };


    const handleRepositoryList = async e => {

        e.preventDefault();

        //const response = await api.post("/api/v1/auth/authenticate", { email, password });
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
          
          {profileInfo && ( <Avatar sx={{ width: 154, height: 154, margin: 1 }} alt="Remy Sharp" src={`${profileInfo.profilePhoto }`} />
          )}

          {profileInfo && (
              <Typography mt={1} fontFamily='Poppins' color={'#00000'} fontSize={20} align={"center"}>
                {profileInfo.firstName + " " + profileInfo.lastName}
            </Typography>
          )}
          

          {profileInfo && (
              <Typography mt={1} fontFamily='Poppins' color={'#00000'} fontSize={20} align={"center"}>
                {profileInfo.about}
            </Typography>
          )}

          <Box mt={1}>
            <Form onSubmit={handleEditProfile}>
              <button style={{cursor: 'pointer'}} type="submit">Editar Perfil</button>
            </Form>
          </Box>    
          <Divider color="#7B1026" sx={{ mt: 2, fontSize:"25px", padding:"15px"}} orientation="horizontal" flexItem light> Criados</Divider>
      </Grid>
      <Box
            justifyContent="center"
            alignItems="left"
            sx={{
                display: { xs: 'none', md: 'flex' },
                background: '#FFF',
                mt:2,
                ml: 10,
                mr: 10,
                borderRadius: 2,
                
            }}
            >
                
                <Box 
                sx={{
                    maxWidth:180,
                    minWidth: 180,
                    minHeight:500, 
                    mr: 2,
                    padding:2, 
                    background: '#7B1026',
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8
                }}>
                    <List
                    sx={{ width: '100%', maxWidth: 200, bgcolor: '#7B1026' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{ mb: 3,bgcolor: '#7B1026', color:'#fff', alignItems:'center', fontSize: 22}}>
                            <FilterListIcon sx={{pr: 2, pl: 2, pt: 2, width: 25, height: 25}}></FilterListIcon>
                            Filtros
                        </ListSubheader>
                    }
                    >
                    <ListItemButton sx={{color:'#fff'}}>
                        <ListItemText primary="TÍTULO" color='#ffff' primaryTypographyProps={{fontSize: '13px'}}  />
                    </ListItemButton>
                    <ListItemButton sx={{color:'#fff'}}>
                        <ListItemText primary="TIPO DE REPRESENTAÇÃO" color='#ffff' primaryTypographyProps={{fontSize: '13px'}}  />
                    </ListItemButton>
                    <ListItemButton sx={{color:'#fff'}}>
                        <ListItemText primary="CATEGORIA" primaryTypographyProps={{fontSize: '13px'}} />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick} sx={{color:'#fff'}}>
                        <ListItemText primary="TAGS" primaryTypographyProps={{fontSize: '13px'}} />
                        {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, color:'#fff' }}>
                            <ListItemText primary="Starred"  />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4, color:'#fff' }}>
                            <ListItemText primary="Starred"  />
                        </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                </Box>

                <Box sx={{ flexGrow: 1, mt: 2 }}>   
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackDropCatalogList}
                    >
                    <CircularProgress color="inherit" />
                    </Backdrop>
                    {Object.values(catalog || {} ).map((item, id) => (
                    <Grow in={true} timeout={600}>
                        <Grid item xs={2} sm={3} md={3} key={item.title}>
                            <Card key={id} sx={{ maxWidth: 300 }}>
                                <CardActionArea onClick={e => handleCard(item, e)}>
                                    <CardMedia
                                    
                                    component="img"
                                    height="200"
                                    image={ `${formatImage(item)}`}
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        WebkitBoxOrient: "vertical",
                                    }}  fontFamily='Poppins' color={'#7B1026'} gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "3",
                                        WebkitBoxOrient: "vertical",
                                    }} 
                                    fontFamily='Poppins' 
                                    variant="body2" 
                                    color="text.secondary"
                                    >
                                        {item.description}
                                    </Typography>
                                    <Typography sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "3",
                                        WebkitBoxOrient: "vertical",
                                    }} 
                                    fontFamily='Poppins' 
                                    variant="body2" 
                                    color="text.secondary"
                                    >
                                        Tipo de representação:
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions onClick={e => handleDeleteCatalog(item, e)}>
                                <Button size="small" color="primary">
                                  Excluir
                                </Button>
                              </CardActions>
                            </Card>
                        </Grid>
                    </Grow>
                    ))}
                </Grid>
                <TablePagination
                    sx={{
                        '.MuiTablePagination-toolbar': {
                          backgroundColor: '#fff',
                          width: '95%',
                          color: 'rgb(41, 39, 39)',
                          height: '35px',
                          fontFamily: 'Poppins',
                          marginTop: 2
                        },
                      }}
                    component="div"
                    labelRowsPerPage={"Itens por página"}
                    count={20}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Box>
            </Box>
            
    
    </Container>
  );
};

export default withAuth(Profile);