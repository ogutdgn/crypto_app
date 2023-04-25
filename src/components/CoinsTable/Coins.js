import React, { useState, useEffect, useCallback } from 'react'
import { CryptoState } from '../../CryptoContext';
import axios from 'axios';
import { CoinList } from '../../config/api';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currency } = CryptoState();

  //!
  const fetchCoins = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error('Failed to fetch trending coins data:', error);
    }

    setLoading(false);

  }, [currency]);
  //!

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins, currency])

  return (
    <div>
      {
        coins.map((coin) => {
          return <div>{coin.name}</div>
        })
      }
    </div>
  )
}

export default Coins;