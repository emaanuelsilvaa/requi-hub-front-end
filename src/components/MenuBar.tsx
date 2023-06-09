import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout, getProfilePhoto } from "../services/auth";

export const TOKEN_KEY = "@requiHub-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


function ResponsiveAppBar() {
  const pages = isAuthenticated() ?  ['Inicio', 'Criar', 'Repositorios'] : ['Inicio', 'Criar', 'Repositorios', 'Login', 'Cadastro'];
  const settings = ['Perfil', 'Sair'];  

    const navigate = useNavigate();
    
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
      console.log(anchorElNav);
      

    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
      console.log(anchorElNav);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);

    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleNavigateMenu = (page: String) => {
      if(page == 'Inicio'){
        navigate('/homev2');
        console.log("testeeee");
        return;
      }
      navigate('/'+ page, { replace: true });
      console.log(page);
    };

    const handleNavigateUserMenu = (setting: String) => {
      if(setting == 'Sair'){
        logout();
        navigate('/homev2', { replace: true });
      }
      if(setting == 'Perfil'){
        navigate('/profile/:name', { replace: true });
      }

      console.log(setting);
    };
  
    return (
      <AppBar sx={{pr: 3, pl: 3}} position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: '#7B1026',
                textDecoration: 'none',
              }}
            >
              RequiHub
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleNavigateMenu(page)}>
                    <Typography sx={{fontFamily: 'Poppins', color: 'black'}}  textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Poppins',
                fontWeight: 700,
                color: '#7B1026',
                textDecoration: 'none',
              }}
            >
              RequiHub
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavigateMenu(page)}
                  sx={{ my: 2, color: 'black', fontFamily: 'Poppins', display: 'block', fontSize:'15px', textTransform: 'none' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {<IconButton style={ isAuthenticated() ? {} : { display: 'none' }} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={(isAuthenticated() && getProfilePhoto() != null ? getProfilePhoto() : "/static/images/avatar/2.jpg" )}/>
                </IconButton>}
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleNavigateUserMenu(setting)}>
                    <Typography sx={{fontFamily: 'Poppins'}} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  export default ResponsiveAppBar;