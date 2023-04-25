import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { CoinList } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { 
  Container, 
  TextField, 
  ThemeProvider, 
  Typography, 
  createTheme 
  } from '@material-ui/core';




const TableHeader = () => {

  const [search, setSearch] = useState("");

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    }
  });
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label = "Search For a Crypto Currency.."
          variant='outlined'
          style={{ marginBottom: 20, width: "100%" }}
          onChange={ (e) => setSearch(e.target.value) }
        />

      </Container>
    </ThemeProvider>
  )
}

export default TableHeader;