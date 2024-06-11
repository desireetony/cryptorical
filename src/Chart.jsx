import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';


function Chart({ sparkline = { price: [] }, priceChange = 0 }) {
  const [chartOptions] = useState({
    series: [{
      data: [...sparkline.price],
    }],
    chart: {
      type: 'area',
      height: 150,
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    tooltip: { enabled: false },
    stroke: { width: 1 },
    colors: [chartColor(priceChange)],
  });

  const memoizedChartColor = useMemo(() => chartColor(priceChange), [priceChange]);

  function chartColor(change) {
    return change <= 0 ? '#ff3131' : '#25df3e';
  }

  return (
    <ReactApexChart options={chartOptions} series={chartOptions.series} className="chart" />
  );
}

export default Chart;
