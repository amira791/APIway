import { useState, useEffect } from 'react';
import { BASEURL,ConsumerBASEURL,fetchData, postData } from './API';
import axios from 'axios';
// src/api.js
export const fetchChartData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  export const fetchLineChartData = async () => {
    const data = await fetchChartData(`${BASEURL}api/line_chart_data/`);
    console.log("DATA line:",data);
    const labels = data.top_apis.map(api => api.api__api_name);
    const salesData = data.top_apis.map(api => api.sales_count);
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'API Sales',
          data: salesData,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };
  };
  
  export const fetchBarChartData = async () => {
    const data = await fetchChartData(`${BASEURL}api/bar_chart_data/`);
    console.log("DATA bar:",data);
    const labels = data.fournisseurs.map(f => f.user__username);
    const apiCounts = data.fournisseurs.map(f => f.api_count);
  
    return {
      labels: labels,
      datasets: [
        {
          label: 'Number of APIs',
          data: apiCounts,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };
  
  export const fetchPieChartData = async () => {
    const data = await fetchChartData(`${BASEURL}api/pie_chart_data/`);
    console.log("DATA pie:",data);
    return {
      labels: ['Active Fournisseurs', 'Inactive Fournisseurs', 'Active Consommateurs', 'Inactive Consommateurs'],
      datasets: [
        {
          data: [
            data.active_fournisseurs,
            data.inactive_fournisseurs,
            data.active_consommateurs,
            data.inactive_consommateurs,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        },
      ],
    };
  };
  