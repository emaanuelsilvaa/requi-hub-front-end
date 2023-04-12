import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import "@fontsource/poppins";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchField from './Search';
import { Link  } from "react-router-dom";
import SignUp from '../pages/SignUp';
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from '@mui/material/Paper';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { borderRadius } from '@mui/system';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'fixed',
  padding: theme.spacing(0, 2),
  marginTop: '40px',
  borderRadius: 20,
  backgroundColor: '#F3F3F3',
  marginRight: '20px',
  marginLeft: '10px',
  width: '100%',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const itemData = [
  {
    img: 'https://d2slcw3kip6qmk.cloudfront.net/marketing/discovery/UML_use_case_diagram.png',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://eufacoprogramas.com/wp-content/uploads/2011/05/uml-resumo-diagrama-de-atividades.jpeg',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQHQbZqIa47-aNqDqAXZIED6mnXW0Pguu0LQ&usqp=CAU',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'http://kickdesigns.com/wp-content/uploads/2019/08/objAmendment.jpg',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://eufacoprogramas.com/wp-content/uploads/2011/05/uml-resumo-diagrama-de-atividades.jpeg',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://eufacoprogramas.com/wp-content/uploads/2011/05/uml-resumo-diagrama-de-atividades.jpeg',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2017Q1/BPMNYoga3.png',
    title: 'Basketball',
    author: '@tjdragotta',
  },{
    img: 'https://www.neomind.com.br/wp-content/uploads/2020/02/bpm.png',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://www.neomind.com.br/wp-content/uploads/2020/02/bpm.png',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://www.neomind.com.br/wp-content/uploads/2020/02/bpm.png',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://blog.iprocess.com.br/wp-content/uploads/2012/11/blog_da_iprocess-exemplo_de_processo_em_bpmn.png',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://unbarqdsw.github.io/2020.1_G7_TCM/docs/assets/Bpmn/bpmn_modelagem.png',
    title: 'Fern',
    author: '@katie_wasserman',
  }
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function ButtonAppBar() {

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ paddingX: 10 }} position="static" color={'inherit'} >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: 'flex',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              fontSize: '60',
              color: '#7B1026',
              textDecoration: 'none',
            }}
          >
            RequiHub
          </Typography>
          <Typography noWrap color={'#7B1026'} variant="h5" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Link to="/signup" style={{color: 'black', fontFamily: 'Poppins', textDecoration: 'none', margin: '20px' }}>Sobre</Link>
          <Link to="/signIn" style={{color: 'black', fontFamily: 'Poppins', textDecoration: 'none', margin: '20px' }}>Login</Link>
          <Link to="/signup" style={{color: 'black', fontFamily: 'Poppins', textDecoration: 'none', margin: '20px' }}>Cadastro</Link>
        </Toolbar>
      </AppBar>
      <Box  paddingX={20} paddingY={5} display='flex' flexDirection='column' gap={2} >
        <Box flexDirection='row' gap={2}>
          <SearchField />
        </Box>

        <Box >
          <Typography fontFamily='Poppins' fontWeight='bold' color={'#00000'} fontSize={40} >
          Encontre, compartilhe e construa requisitos.
          </Typography>
          <Typography mt={2} fontFamily='Poppins' color={'#00000'} fontSize={20}  >
          Crie ideias e formente suas decisões de projeto em parceiria com a comunidade.
          </Typography>
        </Box>
      </Box>
      <hr />
      <Grid container spacing={1}>
        <Grid xs={3} sx={{ pl: 2, backgroundColor: '#F3F3F3' }}>
        <Typography fontFamily='Poppins' color={'#00000'} fontSize={20} align='center' >
          Filtros
          </Typography>
          <FormControl sx={{ m: 1, width: '90%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Tipos</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tipos" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '90%', height: 'auto' }}>
            <InputLabel id="demo-multiple-checkbox-label">Tipos</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tipos" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '90%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Tipos</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Tipos" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={personName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={9}>
          <Item>
          <ImageList  variant="masonry" cols={5} gap={9} >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}