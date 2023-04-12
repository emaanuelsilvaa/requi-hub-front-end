import { Box, Divider, TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import React,{useState, useEffect} from 'react';


export interface Catalog { 
    title: string;
    description: string;
    attachmentModel: {};
    categoryType: { type: string; };
    representationTypeModel: {type: string;};
    subjectTags: [];
  }


const style = {
    width: '300px',
    background: '#eee',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right'
};

const ViewCatalog = () => {
    
    const { state } = useLocation();
    console.log(state.id);

    const [catalog, setCatalog] = useState<Catalog>();

    async function getAns(){

        let output = await api.get("/api/v1/catalog/find/id/"+state.id);

        console.log(output.data + " GET RESULT");
         
        return setCatalog(output.data);
     
    };
    useEffect(() => {
        getAns();
      }, [])
    
    return(
        <div>
            <MenuBar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 1,
                    m: 4,
                    height: 433,
                    borderRadius: 4,
                    bgcolor: '#eee',
                }}   
            > 

                <Typography mt={0} mb={0} fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}>Catalogo</Typography>   

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        bgcolor: '#eee',
                        borderRadius: 4,
                        }}  
                >


                    <Box
                        component="img"
                        sx={{
                        marginLeft: 5,   
                        height: 533,
                        width: 600,
                        maxHeight: { xs: 433, md: 367 },
                        maxWidth: { xs: 550, md: 450 },
                        }}
                        alt="The house from the offer."
                        src="https://media.istockphoto.com/id/1175215972/vector/file-folder-in-flat-on-white-background.jpg?s=612x612&w=0&k=20&c=dALCaVx9KdXJkgPO6Bjim_3TLZA9rnN__9gZRdo1zQ8="
                    />
                    
                    <Box sx={style}>

                        <Typography fontFamily='Poppins' color={'#00000'}> Titulo </Typography>
                        {catalog && (
                            <Typography fontFamily='Poppins' color={'#7B1026'}> {catalog.title} </Typography>
                        )}

                        <Typography fontFamily='Poppins' color={'#00000'}> Descrição </Typography>
                        {catalog && (
                            <Typography fontFamily='Poppins' color={'#7B1026'}> {catalog.description} </Typography>
                        )}

                        <Typography fontFamily='Poppins' color={'#00000'}> Categoria </Typography>
                        {catalog && (
                            <Typography fontFamily='Poppins' color={'#7B1026'}> {catalog.categoryType.type} </Typography>
                        )}

                        <Typography fontFamily='Poppins' color={'#00000'}> Representações </Typography>
                        {catalog && (
                            <Typography fontFamily='Poppins' color={'#7B1026'}> {catalog.representationTypeModel.type} </Typography>
                        )}


                        <Typography fontFamily='Poppins' color={'#7B1026'}> Avaliações  </Typography>
                        <Typography fontFamily='Poppins' color={'#7B1026'}> algum avaliação </Typography>

                    </Box>
                    <Box
                    >
                        <Typography> Comentarios  </Typography>
                    </Box>
                        
                </Box>
                

            </Box>

            <Box>
                <Divider color="#7B1026" sx={{ m: 4, fontSize:20 }} orientation="horizontal" flexItem light> Recomentações</Divider>

            </Box>
        </div>
    );
    
}

export default withAuth(ViewCatalog);