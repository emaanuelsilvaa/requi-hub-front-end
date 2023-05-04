import { Box, Divider, TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import React,{useState, useEffect} from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Modal from '@mui/material/Modal';


export interface Catalog { 
    title: string;
    description: string;
    attachmentModel: { fileType: string, fileSize: number};
    categoryType: { type: string; };
    representationTypeModel: {type: string;};
    subjectTags: [];
  }


const style = {
    width: '300px',
    background: '#fff',
    padding: '30px',
    margin: 2,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right'
};

const modalImageStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

const ViewCatalog = () => {
    
    const { state } = useLocation();
    console.log(state.id);

    const [catalog, setCatalog] = useState<Catalog>();

    const [ selectedFile, setSelectedFile ] = useState<any>()

    //MODAL
    const [openImageModal, setOpenImageModal] = React.useState(false);
    const handleCloseImageModal = () => setOpenImageModal(false);

    const [fileIsPdf, setFileIsPdf] = React.useState(false);

    async function getAnsCatalogFile(){
        let file = await api.get("api/v1/file/download/"+state.id , {
            responseType: "arraybuffer",});

        return setSelectedFile(new Blob([file.data], {
            type: file.headers['content-type']
        }));


    };
    async function getAnsCatalogTextInfo(){

        let output = await api.get("/api/v1/catalog/find/id/"+state.id);
        return setCatalog(output.data);
     
    };
    useEffect(() => {
        getAnsCatalogTextInfo();
        getAnsCatalogFile();
      }, [])
    
    return(
        <Box
        sx={{
            bgcolor: '#eee',
        }}
        >

            <Modal
                open={openImageModal}
                onClose={handleCloseImageModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                style={{ overflow: 'scroll' }}
            >
                <Box  
                    sx={modalImageStyle}
                    component="img"
                    src={selectedFile != null ? URL.createObjectURL(selectedFile) : ""}
                >
                </Box>
                
            </Modal>
            <MenuBar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 1,
                    mt: 4,
                    ml: 10,
                    mr: 10,
                    height: 433,
                    borderRadius: 4,
                    bgcolor: '#fff',
                }}   
            > 

                <Typography mt={0} mb={0} fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}>Catalogo</Typography>   

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        bgcolor: '#fff',
                        borderRadius: 4,
                        }}  
                >
    
                        <Box
                            onClick={e=> (setOpenImageModal(true))}
                            component="img"
                            sx={{
                            marginLeft: 5, 
                            mb: 5,  
                            bgcolor: '#eee',
                            cursor: 'pointer',
                            height: 400,
                            width: 600,
                            maxHeight: { xs: 433, md: 367 },
                            maxWidth: { xs: 433, md: 367 },
                            }}
                            alt="The house from the offer."
                            src={selectedFile != null ? URL.createObjectURL(selectedFile) : ""}
                        />
                    
                        <Box
                        sx={{
                            bgcolor: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: 4,

                        }}
                        >
                            <Box sx={style}>

                                <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Titulo </Typography>
                                {catalog && (
                                    <Typography fontFamily='Poppins' color={'#00000'} fontSize={15}> {catalog.title} </Typography>
                                )}

                                <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Descrição </Typography>
                                {catalog && (
                                    <Typography fontFamily='Poppins' color={'#00000'} fontSize={15}> {catalog.description} </Typography>
                                )}

                                <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Categoria </Typography>
                                {catalog && (
                                    <Typography fontFamily='Poppins' color={'#00000'} fontSize={15}> {catalog.categoryType.type} </Typography>
                                )}

                                <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Tipo de representação </Typography>
                                {catalog && (
                                    <Typography fontFamily='Poppins' color={'#00000'}fontSize={15}> {catalog.representationTypeModel.type} </Typography>
                                )}


                                {/* <Typography fontFamily='Poppins' color={'#7B1026'}> Avaliações  </Typography>
                                <Typography fontFamily='Poppins' color={'#7B1026'}> algum avaliação </Typography> */}

                            </Box>
                            <Box sx={{m:5}}>
                                {/* <Typography> Comentarios  </Typography> */}
                            </Box>
                            
                        </Box>
                        
                    </Box>   
                </Box>

            <Box>
                <Divider color="#7B1026" sx={{ m: 4, fontSize:20 }} orientation="horizontal" flexItem light> Recomentações</Divider>

            </Box>
            <Box  paddingX={10} display='flex' flexDirection='column' gap={2} bgcolor="#7B1026" paddingTop={1} marginTop={2} >
                <Box flexDirection='row' gap={2}>
                </Box>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={30} align={"center"}>
                    RequiHub
                </Typography>
                <Typography fontWeight='bold' fontFamily='Poppins' color={'#FFFF'} fontSize={10} align={"center"}>
                    RequiHub (C) All rights Reserved
                </Typography>
                <GitHubIcon sx={{ color: '#FFFF', alignSelf: 'center', width: 20, height: 20, paddingY: 1 }} ></GitHubIcon>
            </Box>
        </Box>
    );
    
}

export default withAuth(ViewCatalog);