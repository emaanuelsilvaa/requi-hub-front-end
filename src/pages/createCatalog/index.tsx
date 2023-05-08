import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import MenuBar from "../../components/MenuBar";
import api from "../../services/api";
import withAuth from "../../components/withAuth";
import Box from "@mui/material/Box";

import { Form, DragDropContainer } from "./styles";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import Modal from '@mui/material/Modal';
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from '@mui/icons-material/Delete';
import Divider from "@mui/material/Divider";
import GitHubIcon from '@mui/icons-material/GitHub';

/// PDF
import {Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Grow from "@mui/material/Grow";


const filter = createFilterOptions<OptionType>();

interface OptionType {
    id?: number;
    inputValue?: string;
    type?: string;
    
}

export interface Catalog { 
    title: string;
    description: string;
    attachmentModel: {};
    categoryType: { type: string; };
    representationTypeModel: {type: string;};
    subjectTags: [];
}


function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

const style = {
    "& label.Mui-focused": {
      color: "#7B1026"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#7B1026"
      }
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7B1026"
    },
  }


  
const CreateCatalog = () => {

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

    //PDF
    const [numPdfPages, setNumPdfPages] = React.useState(null);
    const [pagePdfNumber, setPdfPageNumber] = React.useState(1);
    //

    const [flexBasis, setFlexBasis] = React.useState(500);

    const [hasSelectedFile, setHasSelectedFile] = React.useState(false);

    const [notIsPdfFile, setNotIsPdfFile] = React.useState(true);


    const [categoryTypesFromBack, setCategoryTypesFromBack] = useState<OptionType[]>([]);
    const [representationTypes, setRepresentationTypes] = useState<OptionType[]>([]);

    const [ error, setError ] = useState("");
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [openBackDropDialog, setOpenBackDropDialog] = React.useState(false);
    const [openSnackBarSuccess, setOpenSnackBarSuccess] = React.useState(false);
    const navigate = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ attachment, setAttachment ] = useState({ 
        selectedFile: "",
        fileType:"",
        fileSize: 0
    });
    const [ categoryType, setCategoryType ] = useState("");
    const [ representationType, setRepresentationType ] = useState("");
    const [ subjectTags, setSubjectTags ] = useState([]);
    const [ selectedFile, setSelectedFile ] = useState<any>()

    const [categoryValue, setCategoryValue] = React.useState<OptionType | null>(null);
    const [representationValue, setRepresentationValue] = React.useState<OptionType | null>(null);

    const [open, toggleCategoryOpen] = React.useState(false);
    const [openRepresentation, toggleRepresentationyOpen] = React.useState(false);

    const [dialogValue, setDialogValue] = React.useState({
        type: '',
    });

    const [openImageModal, setOpenImageModal] = React.useState(false);
    const handleOpenImageModal = () => setOpenImageModal(true);
    const handleCloseImageModal = () => setOpenImageModal(false);


    /* VALIDATIONS */
    const validateCatalogfields = (catalog) => {
        if(!catalog.title || !catalog.description || catalog.representationTypeModel.type == "" || 
            catalog.categoryType.type == "" || !Object.values(subjectTags).some(x => x !== null && x !== '') ){
            return true;
        }
        else{
            return false;
        }
    }

    //PDF
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNotIsPdfFile(false);
		setNumPdfPages(numPages);
        setPdfPageNumber(1);
	};
    const goToPrevPage = (offset) =>
        setPdfPageNumber(pagePdfNumber - 1 <= 1 ? 1 : pagePdfNumber - 1);

	const goToNextPage = () =>
        setPdfPageNumber(
			pagePdfNumber + 1 >= numPdfPages ? numPdfPages : pagePdfNumber + 1,
		);

    async function getAnsRepresentations(){
        /* inserir trycatch */
        let output = await api.get("/api/v1/catalog/representation_type/representations");
        return setRepresentationTypes(output.data.content);
     
    };

    async function getAnsCategory(){
        /* inserir trycatch */
        let output = await api.get("/api/v1/catalog/category");
        return setCategoryTypesFromBack(output.data.content);
     
    };
    useEffect(() => {
        getAnsCategory();
        getAnsRepresentations();
    },[])

    const handleSignIn = async e  => {
        e.preventDefault();

        const objTags = subjectTags.map((item) => {
            return {tagName: item}
        })
        const catalog = {
            title: title,
            description: description,
            attachmentinfo: attachment ,
            categoryType:{
                type: categoryType
            },
            representationTypeModel:{
                type: representationType
            },
            subjectTags: objTags
        }
        console.log("================"+JSON.stringify(catalog));

        if(!validateCatalogfields(catalog) ){
            try{
                setOpenBackDrop(!openBackDrop)
                const response = await api.post("/api/v1/catalog/create", catalog );
                console.log(response.data.id);
                setOpenBackDrop(openBackDrop)
                await timeout(1000);
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append("id", response.data.id);
                const response2 = await api.post("api/v1/file/upload", formData );
                setOpenSnackBarSuccess(true);
                
                navigate('/Catalogo' , { state: { id: response.data.id }});
            }
            catch(err){
                if(err.response.status === 500){
                    console.log("ERRO 500");
                    localStorage.removeItem("@requiHub-Token");
                    setOpenBackDrop(openBackDrop)
                    setOpenSnackBar(true);
                    await timeout(1000);
                    navigate('/Login');
                }  
            }
        }
        else{
            setError("Preencha todos os campos para continuar!");
        }
    }

    const handleClose = () => {
        setDialogValue({
        type: '',
        });
        toggleCategoryOpen(false);
    };

    const handleRepresentationClose = () => {
        setDialogValue({
        type: '',
        });
        toggleRepresentationyOpen(false);
    };


    const handleCategoryTypeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpenBackDropDialog(!openBackDropDialog)
        await timeout(1000);
        setCategoryValue({
        type: dialogValue.type,
        });
        // post to back. 
        try{
            const response = await api.post("/api/v1/catalog/category/create", {type: dialogValue.type  } );
            setCategoryTypesFromBack(types => ({ ...types }));
            setOpenBackDropDialog(openBackDropDialog)
        }catch(err){
            setOpenBackDropDialog(openBackDropDialog)
        }
        getAnsCategory()
        handleClose();
    }

    const handleRepresentationTypeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpenBackDropDialog(!openBackDropDialog)
        await timeout(1000);
        setRepresentationValue({
            type: dialogValue.type,
            });
        // post to back. 
        try{
            const response = await api.post("/api/v1/catalog/representation_type/create", {type: dialogValue.type  } );
            setRepresentationTypes(types => ({ ...types }));
            setOpenBackDropDialog(openBackDropDialog)
        }catch(err){
            setOpenBackDropDialog(openBackDropDialog)
        }
        getAnsRepresentations()
        handleRepresentationClose();
    }

    const changeHandler=(e) => {
        console.log("===typefile="+ e.target.files[0].type);
        if(e.target.files[0].type == "application/pdf"){ setNotIsPdfFile(false)}
        else{
            setNotIsPdfFile(true)
        }
        setAttachment({
            selectedFile: "",
            fileType: e.target.files[0].type,
            fileSize: e.target.files[0].size
         });

         setSelectedFile(e.target.files[0]);
         setHasSelectedFile(true);
    }

    const removeSelectedFile=(e) => {
        setHasSelectedFile(false);
        setSelectedFile(null);
    }
    

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
                {notIsPdfFile ?
                    <Box  sx={modalStyle}>
                    <Button sx={{marginRight: 10, color: '#FFF'}} onClick={e => setOpenImageModal(false)}>Fechar</Button>
                    <Paper variant="outlined">
                        <img src={selectedFile != null ? URL.createObjectURL(selectedFile) : ""} />
                    </Paper>
                    </Box>
                    :
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
                }
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Sessão Expirada ! Faça Login novamente
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackBarSuccess} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Catalogo Cadastrado com Sucesso
                </Alert>
            </Snackbar>
            <MenuBar/>
            <Grow in={true} timeout={600}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    p: 1,
                    ml: 10,
                    mr: 10,
                    mt: 5,
                    mb: 5,
                    borderRadius: 4,
                    bgcolor: '#fff',
                    maxWidth: 2000
                }}   
                >
                    <Typography mt={2} mb={0} fontWeight="md" fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}> Criar Catalogo</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            bgcolor: '#fff',
                            borderRadius: 4,
                            }}  
                    >
                        <div>
                            <DragDropContainer>
                                {hasSelectedFile ?
                                    notIsPdfFile ? 
                                        <Box>
                                            <Box sx={{cursor: 'pointer',}}onClick={e=> (setOpenImageModal(true))}>
                                                <Avatar variant={"rounded"} alt="The image" src={URL.createObjectURL(selectedFile)} style={{
                                                    width: 400,
                                                    height: 250,}}>
                                                </Avatar>
                                            </Box>
                                            <IconButton aria-label="delete" size="small" onClick={removeSelectedFile}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton> 
                                        </Box>      
                                    :
                                        <Box>
                                        <Box sx={{cursor: 'pointer', minHeight: 250, minWidth:350, display: 'flex',
                        justifyContent: 'center'}} onClick={e=> (setOpenImageModal(true))}>
                                            <Document file={URL.createObjectURL(selectedFile)} onLoadSuccess={onDocumentLoadSuccess} >
                                            <Page  renderTextLayer={false}  renderAnnotationLayer={true} pageNumber={pagePdfNumber} 
                                            height={250}
                                            >
                                            </Page>
                                            </Document>
                                        </Box>
                                        <IconButton aria-label="delete" size="small" onClick={removeSelectedFile}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton> 
                                        </Box>
                                :
                                <label style={{ cursor: 'pointer' }}>
                                    <DriveFolderUploadIcon className="upload-btn" sx={{cursor: 'pointer', color: '#7B1026', alignSelf: 'center', width: 60, height: 40, paddingY: 10 }} >
                                    
                                    </DriveFolderUploadIcon>
                                    <Typography mb={0} fontFamily='Poppins' color={'#7B1026'} fontSize={20} align={"center"}> Clique para carregar um arquivo</Typography>
                                    <Typography mb={0} fontFamily='Poppins' color={'#7B1026'} fontSize={13} align={"center"}> Arquivos suportados: PDF, JPEG, PNG</Typography>
                                    <input type="file" name="myfile" style={{display: 'none', cursor: 'pointer' }} onChange={changeHandler}></input>
                                </label>
                                }    
                            </DragDropContainer>
                        </div>
                        
                        <Box sx={{bgcolor: '#fff'}}>
                            <Form onSubmit={handleSignIn}>
                                {error && <p>{error}</p>}
                                <TextField sx={style} id="standard-text" label="Titulo" variant="standard"  onChange={e => setTitle(e.target.value) } />
                                <TextField sx={style} id="standard-description" label="Descrição" variant="standard"  onChange={e => setDescription(e.target.value) } />
                                
                                <Autocomplete
                                sx={style}
                                value={representationValue}
                                onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    // timeout to avoid instant validation of the dialog's form.
                                    setTimeout(() => {
                                    toggleRepresentationyOpen(true);
                                    setDialogValue({
                                        type: newValue,
                                    });
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    toggleRepresentationyOpen(true);
                                    setDialogValue({
                                    type: newValue.inputValue,
                                    });
                                } else {
                                    setRepresentationValue(newValue);
                                }
                                }}
                                filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                if (params.inputValue !== '') {
                                    filtered.push({
                                    inputValue: params.inputValue,
                                    type: `Add "${params.inputValue}"`,
                                    });
                                }

                                return filtered;
                                }}
                                id="free-solo-dialog-demo"
                                options={representationTypes}
                                getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    setRepresentationType(option);
                                    return option;
                                }
                                if (option.inputValue) {
                                    setRepresentationType(option.inputValue);
                                    return option.inputValue;
                                }
                                setRepresentationType(option.type);
                                return option.type;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                renderOption={(props, option) => <li  {...props}>{option.type}</li>}
                                freeSolo
                                renderInput={(params) => <TextField sx={style} variant="standard" {...params} label="Tipo de representação" />}
                                />
                                <Dialog open={openRepresentation} onClose={handleRepresentationClose}>
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={openBackDropDialog}
                                    >
                                    <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <form onSubmit={handleRepresentationTypeSubmit}>
                                        <DialogTitle>Adicionar um novo tipo de representação</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Sentiu falta de alguma representação ? por favor, adicione !
                                            </DialogContentText>
                                            <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            value={dialogValue.type}
                                            onChange={(event) =>
                                                setDialogValue({
                                                ...dialogValue,
                                                type: event.target.value
                                                })
                                            }
                                            label="Tipo de representação"
                                            type="text"
                                            variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleRepresentationClose}>Cancelar</Button>
                                            <Button type="submit">Adicionar</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>   

                                <Autocomplete
                                sx={style}
                                value={categoryValue}
                                onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    // timeout to avoid instant validation of the dialog's form.
                                    setTimeout(() => {
                                    toggleCategoryOpen(true);
                                    setDialogValue({
                                        type: newValue,
                                    });
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    toggleCategoryOpen(true);
                                    setDialogValue({
                                    type: newValue.inputValue,
                                    });
                                } else {
                                    setCategoryValue(newValue);
                                }
                                }}
                                filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                if (params.inputValue !== '') {
                                    filtered.push({
                                    inputValue: params.inputValue,
                                    type: `Add "${params.inputValue}"`,
                                    });
                                }

                                return filtered;
                                }}
                                id="free-solo-dialog-demo"
                                options={categoryTypesFromBack}
                                getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    setCategoryType(option);
                                    return option;
                                }
                                if (option.inputValue) {
                                    setCategoryType(option.inputValue);
                                    return option.inputValue;
                                }
                                setCategoryType(option.type);
                                return option.type;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                renderOption={(props, option) => <li  {...props}>{option.type}</li>}
                                freeSolo
                                renderInput={(params) => <TextField sx={style} variant="standard" {...params} label="Categoria" />}
                                />

                                <Autocomplete
                                    sx={style}
                                    multiple
                                    id="tags-filled"
                                    options={subjectTags}
                                    onChange={(event, value) => setSubjectTags(value)}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                        />
                                    ))
                                    }
                                    renderInput={(params) => (
                                    <TextField
                                        sx={style}
                                        {...params}
                                        variant="standard"
                                        label="Tags"
                                        placeholder="Adicione uma tag"
                                    />
                                    )}
                                />

                                <button style={{cursor: 'pointer'}} type="submit">Salvar</button>

                                <Dialog open={open} onClose={handleClose}>
                                    <Backdrop
                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={openBackDropDialog}
                                    >
                                    <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <form onSubmit={handleCategoryTypeSubmit}>
                                        <DialogTitle>Adicionar um novo tipo de Categoria</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Sentiu falta de alguma Categoria ? por favor, adicione !
                                            </DialogContentText>
                                            <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            value={dialogValue.type}
                                            onChange={(event) =>
                                                setDialogValue({
                                                ...dialogValue,
                                                type: event.target.value
                                                })
                                            }
                                            label="Tipo de Categoria"
                                            type="text"
                                            variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancelar</Button>
                                            <Button type="submit">Adicionar</Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>   
                            </Form>
                        </Box>
                    </Box>
                </Box>
                </Grow>
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
export default withAuth(CreateCatalog);

