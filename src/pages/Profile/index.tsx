import MenuBar from "../../components/MenuBar";
import withAuth from "../../components/withAuth";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, FormEvent } from "react";
import { Form } from "./styles";
import { getUseEmail, getUserId } from "../../services/auth";
import { Container } from "./styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Grow from "@mui/material/Grow";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../services/api";
import { setNewPhoto } from "../../services/auth";

import CatalogFilters from "../../components/CatalogFilters";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  about: string;
  email: string;
  profilePhoto: string;
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

interface PageFilters {
  currentPage: number;
  title: string;
  bibliographicReference: string;
  representationType: string;
  categoryType: string;
  tags: string[];
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);


  const [pageFilters, setPageFilters] = useState<PageFilters>({
    currentPage: 0,
    title: "",
    bibliographicReference: "",
    representationType: "",
    categoryType: "",
    tags: []
  });


  const [catalogPagination, setCatalogPagination] =
    useState<ContentPagination<Catalog> | null>(null);

  const [profileInfo, setProfileInfo] = useState<Profile | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAnsProfile();
  }, []);

  useEffect(() => {
    getAnsCatalogs();
  }, [pageFilters]);

  async function getAnsCatalogs() {
    setIsLoading(true);
    console.log(pageFilters);
    try {
      const { data } = await api.get("/api/v1/catalog/filter", {
        params: {
          userId: getUseEmail() || "",
          title: pageFilters.title || "" ,
          bibliographicReference: pageFilters.bibliographicReference || "" ,
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

  async function getAnsProfile() {
    setIsLoading(true);

    try {
      const { data } = await api.get("/api/v1/users/email", {
        params: {
          email: getUseEmail(),
        },
      });
      setProfileInfo(data);
      setNewPhoto(data.profilePhoto);
    } catch (error) {
      alert("Erro ao obter dados de perfil");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCatalog(id: number) {
    setIsLoading(true);

    try {
      await api.delete("/api/v1/catalog/delete?id=" + id);

      if (pageFilters.currentPage === 0) {
        getAnsCatalogs();
      } else {
        setPageFilters({
          ...pageFilters,
          currentPage: 0,
        });
      }
    } catch (error) {
      alert("Erro ao deletar repositório");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangePage = (newPage: number) => {
    setPageFilters({ ...pageFilters, currentPage: newPage });
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <MenuBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "40vh" }}
      >
        {profileInfo && (
          <>
            <Typography
              mt={4}
              mb={2}
              fontFamily="Poppins"
              color={"#7B1026"}
              fontSize={30}
              align={"center"}
            >
              Perfil
            </Typography>

            <Avatar
              sx={{ width: 154, height: 154, margin: 1 }}
              alt="Remy Sharp"
              src={`${profileInfo.profilePhoto}`}
            />
            <Typography
              mt={1}
              fontFamily="Poppins"
              color={"#00000"}
              fontSize={20}
              align={"center"}
            >
              {profileInfo.firstName + " " + profileInfo.lastName}
            </Typography>
            <Typography
              mt={1}
              fontFamily="Poppins"
              color={"#00000"}
              fontSize={20}
              align={"center"}
            >
              {profileInfo.about}
            </Typography>

            <Box mt={1}>
              <Form
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  navigate("/profile/edit", { state: { id: getUseEmail() } });
                }}
              >
                <button style={{ cursor: "pointer" }} type="submit">
                  Editar Perfil
                </button>
              </Form>
            </Box>
            <Divider
              color="#7B1026"
              sx={{ mt: 2, fontSize: "25px", padding: "15px" }}
              orientation="horizontal"
              flexItem
              light
            >
              Criados
            </Divider>
          </>
        )}
      </Grid>
      <Box
        justifyContent="center"
        alignItems="left"
        sx={{
          display: { xs: "none", md: "flex" },
          background: "#FFF",
          mt: 2,
          ml: 10,
          mr: 10,
          borderRadius: 2,
        }}
      >
        <CatalogFilters onfilter={(filters) => setPageFilters( {currentPage : 0, ...filters} ) } />

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
                        <CardActions onClick={() => deleteCatalog(item.id)}>
                          <Button size="small" color="primary">
                            Excluir
                          </Button>
                        </CardActions>
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
    </Container>
  );
};

export default withAuth(Profile);
