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
                <Box  paddingX={20} paddingY={5} display='flex' flexDirection='column' gap={2} >
                    <Box flexDirection='row' gap={2}>
                    <SearchField />
                    </Box>

                    <Box >
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
                <Box  paddingX={20} display='flex' flexDirection='column' gap={2} >
                    <Box flexDirection='row' gap={2}>
                    </Box>
                    <Typography fontWeight='bold' fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"left"}>
                    Sobre
                        </Typography>
                        <Typography variant="body1" gutterBottom color={'#051120'} sx={{ minWidth:250, maxWidth:1280}} align={"justify"}>
                        Catálogos e modelos de requisitos reutilizáveis são recursos importantes que auxiliam o desenvolvimento de software.
                        O desenvolvimento de um repositório web de catálogos e modelos permite que engenheiros de software consultem determinados 
                        modelos que ajudam na tomada de decisões na construção de um software. Consequentemente, um repositório web possibilita 
                        que os engenheiros de softwares tenham a disponibilidade de  interagirem e enriquecerem o repositório web.  
                        A ideia deste  trabalho é elaborar um  repositório web de modelos e catálogos de requisitos
                        </Typography>
                </Box>

            </Grow>

            <Box>
                <hr style={{ margin: '30px', color: "#eee", border: 'none', borderBottom: '1px solid #cdcdcd'  }} ></hr>

            </Box>
            <Box  paddingX={20} display='flex' flexDirection='column' gap={2} >
                <Box flexDirection='row' gap={2} marginBottom={3}>
                    <Typography fontWeight='bold' fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"left"}>
                        Estatisticas
                    </Typography>
                </Box>
                <Box display='flex' flexDirection='row' marginLeft={10}>
                    <Card  sx={{ maxWidth: 345 }}>
                        <CardMedia
                        component="img"
                        height="120"
                        image="./document.png"
                        alt="Document"
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h6" component="div" fontFamily='Poppins'>
                            100+ Documentos
                        </Typography>
                        </CardContent>
                    </Card>
                    <Card  sx={{ maxWidth: 345, marginLeft: 30 }}>
                        <CardMedia
                        component="img"
                        height="120"
                        image="./group.png"
                        alt="Document"
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h6" component="div" fontFamily='Poppins'>
                            100+ Colaboradores
                        </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box  paddingX={20} display='flex' flexDirection='column' gap={2} bgcolor="#7B1026" paddingTop={5} marginTop={2} >
                <Box flexDirection='row' gap={2}>
                </Box>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={30} align={"center"}>
                    RequiHub
                </Typography>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={10} align={"center"}>
                    StyleShit (C) All rights Reserved
                </Typography>
                <GitHubIcon sx={{ color: '#FFFF', alignSelf: 'center', width: 40, height: 40, paddingY: 2 }} ></GitHubIcon>
            </Box>
        </Container>

    );
}

