import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, Navigate  } from "react-router-dom";
import ResponsiveAppBar from "../../components/MenuBar";
import SearchField from "../../components/Search";
import GitHubIcon from '@mui/icons-material/GitHub';
import Icon from '@mui/material/Icon';

import { Container } from "./styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import { padding } from "@mui/system";

export default function initial() {

    return (
        <Container sx={{ flexGrow: 1 }}>
            <ResponsiveAppBar/>
            <Grow in={true} timeout={300}>
                <Box  paddingX={20} paddingY={5} display='flex' flexDirection='column' gap={2} sx={{minHeight: 300}} >
                    <Box flexDirection='row' gap={2} sx={{mt: 5}}>
                    <SearchField />
                    </Box>

                    <Box sx={{mt: 5}}>
                    <Typography fontFamily='Poppins' fontWeight='bold' color={'#7B1026'} fontSize={40} >
                    Encontre, compartilhe e construa requisitos.
                    </Typography>
                    <Typography mt={2} fontFamily='Poppins' color={'#051120'} fontSize={20}  >
                    Crie ideias, melhore suas decisões de projeto em parceiria com a comunidade.
                    </Typography>
                    </Box>
                </Box>
            </Grow>
            <hr style={{ margin: '30px', color: "#eee", border: 'none', borderBottom: '1px solid #cdcdcd'  }} ></hr>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
                >
                <Box  paddingX={20} display='flex' flexDirection='column' gap={2} sx={{minHeight: 250}} >

                    <Box flexDirection='row' gap={2}>
                    </Box>
                    <Typography fontWeight='bold' fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"left"}>
                    Sobre
                        </Typography>
                        <Typography variant="body1" gutterBottom color={'#051120'} sx={{ minWidth:250, maxWidth:1280}} align={"justify"}>
                        Requihub é uma plataforma que tem o intuito de auxiliar desenvolvedores e pessoas da area de TI na elaboração de requisitos de software. 
A plataforma permite que desenvolvedores acelerem o processo de construção de requisitos atraves do reuso. Para incentivar o reuso, 
a plataforma propoem um ambiente eficiente para o compartilhamento e a utilização de catalogos e modelos. 
                        </Typography>
                </Box>

            </Grow>

            <Box>
                <hr style={{ margin: '30px', color: "#eee", border: 'none', borderBottom: '1px solid #cdcdcd'  }} ></hr>

            </Box>

            <Box  paddingX={10} display='flex' flexDirection='column' gap={2} bgcolor="#7B1026" paddingTop={1} marginTop={2} >
                <Box flexDirection='row' gap={1}>
                </Box>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={30} align={"center"}>
                    RequiHub
                </Typography>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={10} align={"center"}>
                    RequiHub (C) All rights Reserved
                </Typography>
            </Box>
        </Container>

    );
}

