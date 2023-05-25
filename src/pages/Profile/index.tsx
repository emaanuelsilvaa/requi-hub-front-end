import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import {useNavigate } from 'react-router-dom';
import React,{useState, useEffect} from 'react';

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


const itemData = [
  {
    img: 'https://t9z6z8s3.rocketcdn.me/wp-content/uploads/2015/10/Conhe%C3%A7a-o-BPMN.png',
    title: 'Bed',
    author: 'Swabdesign',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'
  },
  {
    img: 'https://www.projektron.de/fileadmin/user_upload/1_bilder_website/blog/fachartikel/2022/BPMN/221212_BPMN_Teaserbild.png',
    title: 'Books',
    author: 'Pavel Nekoranec',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'
  },
  {
    img: 'https://webmaissistemas.com.br/blog/app/uploads/2022/02/Simbolos-da-notacao-BPMN-2.0.webp',
    title: 'Sink',
    author: 'Charles Deluvio',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://cdn-images.zety.com/pages/curriculum_pdf_zety_br_1.jpg',
    title: 'Kitchen',
    author: 'Christian Mackie',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://www.empregare.com/assetsV2/common/images/gerador-curriculo/exemplo_cadastro_curriculo_mobile.png',
    title: 'Blinds',
    author: 'Darren Richardson',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
    author: 'Taylor Simpson',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
    author: 'Ben Kolde',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
    author: 'Philipp Berndt',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
    author: 'Jen P.',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
    author: 'Douglas Sheppard',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur'

  },
];
export interface Catalog { 
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

    async function getAnsCategory(){
      /* inserir trycatch */
      let output = await api.get("api/v1/catalog/find/by/author?id=1");
      console.log(output);
      
      return setCatalog(output.data.content);
   
  };
  useEffect(() => {
      getAnsCategory();
      
  },[])

    const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
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
                                <CardActionArea>
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
                                <CardActions>
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