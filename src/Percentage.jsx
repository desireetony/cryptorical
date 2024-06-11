import React from 'react';

export default function Percentage({ coin = 0 }) {
  function percentageColor() {
    if (coin <= 0) {
      return 'falling';
    } else {
      return 'rising';
    }
  }

  return <td className={percentageColor()}>{coin.toFixed(1)}%</td>;
}

