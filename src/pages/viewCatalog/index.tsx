import { Box, Chip, Divider, TextField, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import api from "../../services/api";
import { useLocation } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import React,{useState, useEffect} from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Modal from '@mui/material/Modal';
import {Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';
import Grow from "@mui/material/Grow";


export interface Catalog { 
    title: string;
    description: string;
    bibliographicReference: string;
    attachmentModel: { fileType: string, fileSize: number};
    author: Author;
    categoryType: { type: string; };
    representationTypeModel: {type: string;};
    subjectTags: SubjectTags[];
  }

  interface Author {
    id: number;
    firstName: string;
    lastName: string;
 }
  interface SubjectTags {
    id: number;
    tagName: string;
    catalogOrigin: string;
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

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

    
    const { state } = useLocation();
    console.log(state.id);

    const [catalog, setCatalog] = useState<Catalog>();

    const [ selectedFile, setSelectedFile ] = useState<any>()

    //MODAL
    const [openImageModal, setOpenImageModal] = React.useState(false);
    const handleCloseImageModal = () => setOpenImageModal(false);

    const [fileIsPdf, setFileIsPdf] = React.useState(false);

     //PDF
     const [numPdfPages, setNumPdfPages] = React.useState(null);
     const [pagePdfNumber, setPdfPageNumber] = React.useState(1);
     //

     const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPdfPages(numPages);
        setPdfPageNumber(1);
	};

    async function getAnsCatalogFile(){
        let file = await api.get("/api/v1/public/catalog/download/"+state.id , {
            responseType: "arraybuffer",});

        return setSelectedFile(new Blob([file.data], {
            type: file.headers['content-type']
        }));


    };
    async function getAnsCatalogTextInfo(){

        let output = await api.get("api/v1/public/catalog/find/id/"+state.id);
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
                {selectedFile != null && selectedFile.type == "application/pdf" ?
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    >   
                        <Document file={selectedFile != null ? URL.createObjectURL(selectedFile) : ""} onLoadSuccess={onDocumentLoadSuccess} >
                        <Button sx={{marginRight: 10, color: '#FFF'}} onClick={e => setOpenImageModal(false)}>Fechar</Button>
                            {Array.from(
                                new Array(numPdfPages),
                                (el,index) => 
                                <Page  renderTextLayer={false}  renderAnnotationLayer={true} size="A4" key={`page_${index+1}`} pageNumber={index+1}/>
                            )}
                        </Document>
                    </Box>
                :
                    <Box  
                    sx={modalImageStyle}
                    component="img"
                    src={selectedFile != null ? URL.createObjectURL(selectedFile) : ""}
                    >
                    </Box>
                }
                
            </Modal>
            <MenuBar/>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 1,
                    mt: 5,
                    mb: 5,
                    ml: 10,
                    mr: 10,
                    borderRadius: 4,
                    bgcolor: '#fff',
                }}   
            > 
                <Box sx={{display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    mt:2,}}>
                    <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}>Catalogo</Typography>   
                </Box>
                
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        bgcolor: '#fff',
                        borderRadius: 4,
                        pr: 8
                        }}  
                >
                    
                    {selectedFile != null && selectedFile.type == "application/pdf" ?
                        <Box sx={{cursor: 'pointer', minHeight: 433, minWidth:433, display: 'flex',
                    justifyContent: 'center'}} onClick={e=> (setOpenImageModal(true))}>
                            <Document file={URL.createObjectURL(selectedFile)} onLoadSuccess={onDocumentLoadSuccess} >
                                <Page  renderTextLayer={false}  renderAnnotationLayer={true} pageNumber={pagePdfNumber} 
                                height={433}
                                >
                                </Page>
                            </Document>
                        </Box>
                    :
                        <Box
                        onClick={e=> (setOpenImageModal(true))}
                        component="img"
                        sx={{
                        marginLeft: 5, 
                        mb: 5,  
                        bgcolor: '#eee',
                        cursor: 'pointer',
                        height: 400,
                        minWidth: 500,
                        maxHeight: { xs: 433, md: 567 },
                        maxWidth: { xs: 633, md: 767 },
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        objectFit: 'cover'
                        }}
                        alt="Catalog File."
                        src={selectedFile != null ? URL.createObjectURL(selectedFile) : ""}
                        />
                    }
                    
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
                            <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Referencia bibliografica </Typography>
                            {catalog && (
                                <Typography fontFamily='Poppins' color={'#00000'}fontSize={15}> {catalog.bibliographicReference ? catalog.bibliographicReference : "Referencia nao cadastrada"} </Typography>
                            )}
                            <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Autor </Typography>
                            {catalog && (
                                <Typography fontFamily='Poppins' color={'#00000'}fontSize={15}> {catalog.author.firstName + " " + catalog.author.lastName } </Typography>
                            )}
                            <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={20}> Tags </Typography>
                            {catalog && (
                                <Box>
                                    {
                                    catalog.subjectTags.map((item, id) => (

                                        <Chip label={item.tagName} variant="outlined" />

                                     ))
                                    } 
                                </Box>
                            )}

                <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    flexDirection: 'row',
                    mt:2,
                    cursor: 'pointer',
                    }}
                >
                    <a href={selectedFile != null ? URL.createObjectURL(selectedFile) : ""} style={{textDecoration: 'none', cursor: 'pointer', display: 'flex',
                    justifyContent: 'left',
                    flexDirection: 'row', }} target="_blank" rel="noopener noreferrer" download>
                    <Typography fontFamily='Poppins' color={'#7B1026'} fontSize={15} align={"left"}>Baixar</Typography>   
                    <DownloadIcon sx={{ color: '#7B1026', alignSelf: 'right', width: 25, height: 25 }}></DownloadIcon>
                    </a>
                </Box>

                            {/* <Typography fontFamily='Poppins' color={'#7B1026'}> Avaliações  </Typography>
                            <Typography fontFamily='Poppins' color={'#7B1026'}> algum avaliação </Typography> */}

                        </Box>
                        <Box sx={{m:5}}>
                            {/* <Typography> Comentarios  </Typography> */}
                        </Box>
                        
                    </Box>
                </Box>   
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

export default ViewCatalog;