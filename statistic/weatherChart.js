// https://www.chartjs.org/docs/latest/getting-started/integration.html

// 2. Versuch:
// import Chart from 'https://cdn.jsdelivr.net/npm/chart.js/auto/+esm';

// 1. Versuch:
// import { Chart } from "chart.js/auto";

export class weatherChart{
  constructor(weatherService){
    this.weatherService = weatherService;
  }

  createChart(data, days){ 
    const ctx = document.getElementById('weatherChart');

  // chart.js:13 Uncaught (in promise) Error: Canvas is already in use. 
  // Chart with ID '0' must be destroyed before the canvas with ID 'weatherChart' 
  // can be reused. DAFÜR:
    if (this.chart) {
      this.chart.destroy();
    }

    if(days == 0){
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
    });  
    } else {
        this.chart = new Chart(ctx, {
        type: 'line',
        data: data,
      });
    }
  }
}

