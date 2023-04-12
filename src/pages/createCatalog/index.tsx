import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import MenuBar from "../../components/MenuBar";
import api from "../../services/api";
import withAuth from "../../components/withAuth";
import Box from "@mui/material/Box";

import { Form, Container, DragDropContainer } from "./styles";
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

const filter = createFilterOptions<CategoryOptionType>();

interface CategoryOptionType {
    id?: number;
    inputValue?: string;
    title: string;
    type?: string;
    year?: number;
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

    const [categoryTypesFromBack, setCategoryTypesFromBack] = useState<CategoryOptionType[]>([]);
    const [ error, setError ] = useState("");
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
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

    const [value, setValue] = React.useState<CategoryOptionType | null>(null);
    const [open, toggleOpen] = React.useState(false);

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
        type: '',
    });


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

    async function getAnsCategory(){
        /* inserir trycatch */
        let output = await api.get("/api/v1/catalog/category");
        return setCategoryTypesFromBack(output.data.content);
     
    };
    useEffect(() => {
        getAnsCategory();
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
        console.log(JSON.stringify(catalog));

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
        title: '',
        year: '',
        type: '',
        });
        toggleOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
        title: dialogValue.title,
        year: parseInt(dialogValue.year, 10),
        type: dialogValue.title,
        });
        // post to back. 
        try{
            const response = await api.post("/api/v1/catalog/category/create", {type: dialogValue.title  } );
            setCategoryTypesFromBack(types => ({ ...types }));
        }catch(err){

        }
        getAnsCategory()
        handleClose();
    }

    const changeHandler=(e) => {
        setAttachment({
            selectedFile: "",
            fileType: e.target.files[0].type,
            fileSize: e.target.files[0].size
         });

         setSelectedFile(e.target.files[0]);
    }

    return(
        <div>
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
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 1,
                m: 4,
                borderRadius: 4,
                bgcolor: '#eee',
            }}   
            >
                <Typography mt={2} mb={0} fontFamily='Poppins' color={'#7B1026'} fontSize={30} align={"center"}> Criar Catalogo</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        bgcolor: '#eee',
                        borderRadius: 4,
                        }}  
                >
                    <div>
                        
                        <DragDropContainer>
                        <p>  </p>
                        <div className="form-group files color">
                            <label>
                                <DriveFolderUploadIcon className="upload-btn" sx={{ color: '#7B1026', alignSelf: 'center', width: 60, height: 40, paddingY: 13 }} ></DriveFolderUploadIcon>
                                <input type="file" name="myfile" style={{display: 'none' }} onChange={changeHandler}></input>
                            </label>
                            
                        </div>
                        </DragDropContainer>
                    </div>
                
                    <Box>
                        <Form onSubmit={handleSignIn}>
                            {error && <p>{error}</p>}
                            <TextField sx={style} id="standard-text" label="Titulo" variant="standard"  onChange={e => setTitle(e.target.value) } />
                            <TextField sx={style} id="standard-description" label="Descrição" variant="standard"  onChange={e => setDescription(e.target.value) } />
                            <TextField sx={style} id="standard-category" label="Categoria Tipo" variant="standard" onChange={e => setCategoryType(e.target.value) } />
                            
                            <Autocomplete
                            sx={style}
                            value={value}
                            onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                // timeout to avoid instant validation of the dialog's form.
                                setTimeout(() => {
                                toggleOpen(true);
                                setDialogValue({
                                    title: newValue,
                                    year: '',
                                    type: newValue,
                                });
                                });
                            } else if (newValue && newValue.inputValue) {
                                toggleOpen(true);
                                setDialogValue({
                                title: newValue.inputValue,
                                year: '',
                                type: newValue.inputValue,
                                });
                            } else {
                                setValue(newValue);
                            }
                            }}
                            filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            if (params.inputValue !== '') {
                                filtered.push({
                                inputValue: params.inputValue,
                                title: `Add "${params.inputValue}"`,
                                type: `Add "${params.inputValue}"`
                                });
                            }

                            return filtered;
                            }}
                            id="free-solo-dialog-demo"
                            options={categoryTypesFromBack}
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
                            setRepresentationType(option.title);
                            return option.type;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            renderOption={(props, option) => <li  {...props}>{option.type}</li>}
                            freeSolo
                            renderInput={(params) => <TextField sx={style} variant="standard" {...params} label="Tipos de representação" />}
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

                            <button type="submit">Criar</button>

                            <Dialog open={open} onClose={handleClose}>
                                <form onSubmit={handleSubmit}>
                                    <DialogTitle>Adicionar um novo tipo de representação</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Sentiu falta de alguma representação ? por favor, adicione !
                                        </DialogContentText>
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={dialogValue.title}
                                        onChange={(event) =>
                                            setDialogValue({
                                            ...dialogValue,
                                            title: event.target.value,
                                            type: event.target.value
                                            })
                                        }
                                        label="Tipo de representação"
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
        </div>
    );
}
export default withAuth(CreateCatalog);

