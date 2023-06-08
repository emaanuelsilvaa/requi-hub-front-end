import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import FilterListIcon from "@mui/icons-material/FilterList";

import { Autocomplete, Box, Chip, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { SubmitButton } from "./styles";

const filterStyle = {
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiInput-root:hover": {
    "&:before": {
      borderBottomColor: "#fff !important",
    },
  },
  "& .MuiInput-input": {
    color: "#fff",

    "&:hover .MuiInput-underline:before": {
      borderBottomColor: "#fff",
    },
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
  "& .MuiChip-label": {
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",

    "&:hover": {
      color: "#fff",
    },
  },
};

interface OptionType {
  id: number;
  type: string;
}

interface Filters {
  title: string;
  representationType: string;
  categoryType: string;
  bibliographicReference: string;
  tags: string[];
}

interface CatalogFiltersProps {
  onfilter: (
    filters: Filters
  ) => void 
}

export default function CatalogFilters({onfilter} : CatalogFiltersProps ) {

  const [filters, setFilters] = useState<Filters>({
    title: "",
    representationType: "",
    bibliographicReference: "",
    categoryType: "",
    tags: [],
  });

  const [representationTypes, setRepresentationTypes] = useState<OptionType[]>(
    []
  );
  const [categoryTypes, setCategoryTypes] = useState<OptionType[]>([]);

  async function getAnsRepresentations() {
    const { data } = await api.get(
      "/api/v1/catalog/representation_type/representations"
    );
    setRepresentationTypes(data.content);
  }

  async function getAnsCategories() {
    const { data } = await api.get("/api/v1/catalog/category");
    setCategoryTypes(data.content);
  }

  useEffect(() => {
    getAnsRepresentations();
    getAnsCategories();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 180,
        minWidth: 180,
        minHeight: 500,
        mr: 2,
        padding: 2,
        background: "#7B1026",
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onfilter(filters);
        }}
      >
        <List
          sx={{ width: "100%", maxWidth: 200, bgcolor: "#7B1026" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                mb: 3,
                bgcolor: "#7B1026",
                color: "#fff",
                alignItems: "center",
                fontSize: 22,
              }}
            >
              <FilterListIcon
                sx={{ pr: 2, pl: 2, pt: 2, width: 25, height: 25 }}
              ></FilterListIcon>
              Filtros
            </ListSubheader>
          }
        >
          <ListItem>
            <TextField
              id="title"
              label="Título"
              type="text"
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "#fff",
                },
              }}
              variant="standard"
              sx={filterStyle}
              value={filters.title}
              onChange={(event) => {
                setFilters({ ...filters, title: event.target.value });
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              id="bibliographicReference"
              label="Referencia Bibliografica"
              type="text"
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "#fff",
                },
              }}
              variant="standard"
              sx={filterStyle}
              value={filters.bibliographicReference}
              onChange={(event) => {
                setFilters({ ...filters, bibliographicReference: event.target.value });
              }}
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              autoSelect
              freeSolo
              id="representationTypes"
              value={filters.representationType}
              onChange={(_, newValue) => {
                setFilters({
                  ...filters,
                  representationType: newValue,
                });
              }}
              options={representationTypes.map((item) => item.type)}
              fullWidth
              sx={filterStyle}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tipo de representação"
                  sx={filterStyle}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: "#fff",
                    },
                  }}
                />
              )}
              noOptionsText="Não encontrado"
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              freeSolo
              autoSelect
              id="categoryTypes"
              value={filters.categoryType}
              onChange={(_, newValue) => {
                setFilters({
                  ...filters,
                  categoryType: newValue,
                });
              }}
              options={categoryTypes.map((item) => item.type)}
              fullWidth
              sx={filterStyle}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tipo de categoria"
                  sx={filterStyle}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: "#fff",
                    },
                  }}
                />
              )}
              noOptionsText="Não encontrado"
            />
          </ListItem>
          <ListItem>
            <Autocomplete
              id="tags"
              onChange={(_, newValue) => {
                setFilters({
                  ...filters,
                  tags: newValue,
                });
              }}
              options={filters.tags}
              fullWidth
              sx={filterStyle}
              multiple
              freeSolo
              limitTags={5}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    {...getTagProps({ index })}
                    variant="outlined"
                    label={option}
                    sx={filterStyle}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Tags"
                  sx={filterStyle}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      color: "#fff",
                    },
                  }}
                />
              )}
            />
          </ListItem>
        </List>
        <SubmitButton type="submit">Buscar</SubmitButton>
      </form>
    </Box>
  );
}
