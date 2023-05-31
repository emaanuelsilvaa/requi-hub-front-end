import Box from '@mui/material/Box';
import React,{useState, useEffect} from 'react';
import MenuBar from '../../components/MenuBar';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import TablePagination from '@mui/material/TablePagination';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../services/api";
import { getUseEmail } from "../../services/auth";
import CatalogFilters from '../../components/CatalogFilters';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
interface PageFilters {
    currentPage: number;
    title: string;
    representationType: string;
    categoryType: string;
    tags: string[];
  }

  export interface Catalog {
    id: number;
    title: string;
    description: string;
    attachment: Attachment;
    categoryType: { type: string };
    representationTypeModel: { type: string };
    subjectTags: [];
  }
  
  interface Attachment {
    id: number;
    attachmentLink: string;
    thumbnailLink: string;
  }
  
  interface ContentPagination<T> {
    totalElements: number;
    size: number;
    number: number;
    content: T[];
  }



const Repository = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    
    const [pageFilters, setPageFilters] = useState<PageFilters>({
        currentPage: 0,
        title: "",
        representationType: "",
        categoryType: "",
        tags: []
    });

  const [catalogPagination, setCatalogPagination] =
  useState<ContentPagination<Catalog> | null>(null);
    
    useEffect(() => {
        getAnsCatalogs();
      }, [pageFilters]);


    const handleChangePage = (newPage: number) => {
        setPageFilters({ ...pageFilters, currentPage: newPage });
      };


    async function getAnsCatalogs() {
        setIsLoading(true);
        console.log(pageFilters);
        try {
          const { data } = await api.get("/api/v1/catalog/filter", {
            params: {
              userId: getUseEmail() || "",
              title: pageFilters.title || "" ,
              categoryType: pageFilters.categoryType || "",
              representationType: pageFilters.representationType || "",
              subjectTags: pageFilters.tags.join() || "" ,
              page: pageFilters.currentPage,
            },
          });
    
          setCatalogPagination(data);
        } catch (error) {
          alert("Erro ao obter lista de repositórios");
        } finally {
          setIsLoading(false);
        }
      }
    
    return(
        <Box>
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
                <CatalogFilters  onfilter={(filters) => setPageFilters( {currentPage : 0, ...filters} )}/>

                <Box sx={{ flexGrow: 1, mt: 2 }}> 
                {catalogPagination && (
            <>
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {catalogPagination.content.map((item, id) => (
                  <Grow in={true} timeout={600}>
                    <Grid item xs={2} sm={3} md={3} key={item.title}>
                      <Card key={id} sx={{ maxWidth: 300 }}>
                        <CardActionArea
                          onClick={() => {
                            navigate("/Catalogo", { state: { id: item.id } });
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={`data:image/png;base64, ${item.attachment.thumbnailLink}`}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                              }}
                              fontFamily="Poppins"
                              color={"#7B1026"}
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                              }}
                              fontFamily="Poppins"
                              variant="body2"
                              color="text.secondary"
                            >
                              {item.description}
                            </Typography>
                            <Typography
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                              }}
                              fontFamily="Poppins"
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
                  ".MuiTablePagination-toolbar": {
                    backgroundColor: "#fff",
                    width: "95%",
                    color: "rgb(41, 39, 39)",
                    height: "35px",
                    fontFamily: "Poppins",
                    marginTop: 2,
                  },
                }}
                component="div"
                count={catalogPagination.totalElements}
                page={catalogPagination.number}
                rowsPerPage={20}
                rowsPerPageOptions={[20]}
                onPageChange={(_, newPage) => handleChangePage(newPage)}
              />
            </>
          )}
                
            </Box>
        </Box>

        <Backdrop
            sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
            
        </Box>
    );

}

export default Repository;
