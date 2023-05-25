import Box from '@mui/material/Box';
import React,{useState, useEffect} from 'react';
import MenuBar from '../../components/MenuBar';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import SearchField from '../../components/Search';
import TablePagination from '@mui/material/TablePagination';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import FilterListIcon from '@mui/icons-material/FilterList';


import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


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

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}


const Repository = () => {

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openBackDropCatalogList, setOpenBackDropCatalogList] = React.useState(false);

    const [openSubMenu, setOpenSubMenu] = React.useState(true);

    const handleClick = () => {
        setOpenSubMenu(!openSubMenu);
    };



    const handleChangePage = async (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
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

    return(
        <Box sx={{}}>
            <MenuBar/>
            <Box
            justifyContent="center"
            alignItems="left"
            sx={{
                display: { xs: 'none', md: 'flex' },
               
                background: '#FFF',
                margin:10,
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
                    {itemData.map((item) => (
                    <Grow in={true} timeout={600}>
                        <Grid item xs={2} sm={3} md={3} key={item.title}>
                            <Card sx={{ maxWidth: 300 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography noWrap fontFamily='Poppins' color={'#7B1026'} gutterBottom variant="h5" component="div">
                                        {item.author}
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
            
        </Box>
    );

}

export default Repository;
