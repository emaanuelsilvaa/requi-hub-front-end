import React, { useState } from 'react'

import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



const TextField = styled(MuiTextField)<TextFieldProps>(() => ({
  background: '#F3F3F3',
  borderRadius: '25px',

  '& .MuiInputBase-input': {
    fontSize: 15,
  },

  '&.Mui-focused fieldset': {
    border: 'none',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}))

export default function SearchField(props: TextFieldProps): JSX.Element {

  const [ searchText, setSearchText ] = useState("");
  const navigate = useNavigate();

  const handleText = e => {
    if(searchText != ""){
      navigate('/Criar' , { state: { searchText: searchText }});
    }
    e.preventDefault();
    console.log("teste");
    return;
  }
  return (
    <>
      <form onSubmit={handleText}>
        <TextField
          placeholder="Buscar no repositorio"
          variant="outlined"
          fullWidth
          onChange={e => setSearchText(e.target.value)}
          sx={{ minWidth:250, maxWidth:1000 , fontFamily: 'Poppins' }}
          {...props}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </>
  )
}
