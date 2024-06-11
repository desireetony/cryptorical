import React, { useState, useEffect } from 'react';
import './index.css';
import Percentage from './Percentage';
import Chart from './Chart';

export default function CryptoCurrencyTable() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceUrl =
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h&locale=en';
        const response = await fetch(priceUrl);
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.log('failed to retrieve data:' + error);
      }
    };

    fetchData(); // Corrected: Removed quotes and called the function directly
  }, []);

  function formatToUsd(val) {
    const formattedValue = val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const trimmedValue = formattedValue.replace('.00', '');
    return trimmedValue;
  }

  return (
    <div className="crypto-prices">
      <div className="title">
        <h1>Top Cryptocurrency Prices by Market Cap</h1>
        <p>
          powered by <a href="https://www.coingecko.com/">CoinGecko</a>
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Coins</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>24 Volume</th>
            <th>Market Cap</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td>
                <div className="coin">
                  <img src={coin.image} alt={coin.symbol} />
                  <h4>{coin.name}</h4>
                  <small>{coin.symbol}</small>
                </div>
              </td>
              <td>{formatToUsd(coin.current_price)}</td>
              <Percentage coin={coin.price_change_percentage_1h_in_currency} />
              <Percentage coin={coin.price_change_percentage_24h_in_currency} />
              <Percentage coin={coin.price_change_percentage_7d_in_currency} />
              <td>{formatToUsd(coin.total_volume)}</td>
              <td>{formatToUsd(coin.market_cap)}</td>
              <td>
                <Chart sparkline={coin.sparkline_in_7d} priceChange={coin.price_change_percentage_7d_in_currency} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
