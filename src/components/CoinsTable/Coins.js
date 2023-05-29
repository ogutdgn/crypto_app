import React, { useState, useEffect, useCallback } from 'react'
import { CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { CoinList } from '../../config/api';
import { LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const Coins = ({ search }) => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  const navigate = useNavigate();

  const classes = useStyles();

  //!
  const fetchCoins = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch trending coins data:', error);
    }

  }, [currency]);
  //!

  //!
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  //!

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins, currency])

  return (
    <TableContainer>
      {
        loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>

            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {
                handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return(
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell 
                        component="th" 
                        scope='row'
                        styles={{
                          display: "flex",
                          gap: 15,
                        }}
                      >

                      </TableCell>
                    </TableRow>
                  )

                })
              }
            </TableBody>


          </Table>
        )
      }
    </TableContainer>
  )
}

export default Coins;