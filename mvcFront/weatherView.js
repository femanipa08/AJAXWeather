export class WeatherView{
    constructor(weatherService, weatherChart){
        this.weatherService = weatherService;
        this.weatherChart = weatherChart;

        this.outputDate = document.querySelector('#inDateToday');

        this.btnToday = document.getElementById('btnToday');
        this.btnToday.addEventListener('click', async()=>{
// heute ist Tag 0
// ruft die loadWeather auf und erhält von dieser Array
            this.loadAndShow(0)
        })

        this.btnThreeDays = document.getElementById('btnThreeDays');
        this.btnThreeDays.addEventListener('click',async()=>{
// 3Tage Vorschau => Morgen, Übermorgen, Ü-Übermorgen (Heute(Mo),Di,Mi,Do)
            this.loadAndShow(3);
        })

        this.btnSevenDays = document.getElementById('btnSevenDays');
        this.btnSevenDays.addEventListener('click',async()=>{
            this.loadAndShow(7);
        })

        this.outputWeather = document.querySelector('#divShowWeather');

    }

    async loadAndShow(days){
        this.cleanOutput();
        const weathers = await this.weatherService.loadWeather(days);
        this.showWeather(weathers);
        // Chart:
        const chartData = this.weatherService.dataChartWeather(weathers);
        this.weatherChart.createChart(chartData, days);

    }

    weatherIcons(wetterlage){
        const icons = {
            'sonnig': './pictures/sun.png',
            'bewölkt': './pictures/claudy.png',
            'starker Regen': './pictures/heavyrain.png',
            'regen': './pictures/rain.png',
            'windig': './pictures/wind.png' 
        };
    return icons[wetterlage];
    }

// zeigt das heutige Datum oben an, wird in app.js beim starten aufgerufen
    showDate(){
        const date = this.weatherService.loadDate(0);
        this.outputDate.value = date[0].display;
    }

    cleanOutput(){
        this.outputWeather.innerHTML ="";
    }

    showWeather(weathers){
// zum testen
// console.log('showWeather:', weathers);
// console.log('weathers[0]:', weathers[0]);
// console.log('weather:', weathers[0].weather);
        const table = document.createElement('table');

        const tableRow = document.createElement('tr');
        const tablehead = ['Datum','Minumum', 'Maximum', 'Wetterlage', 'Wetterwarnung','Anzeige']

        for(let i = 0; i < tablehead.length; i++){
            const th = document.createElement('th');
            th.textContent = tablehead[i];
            tableRow.appendChild(th);
        }
        table.appendChild(tableRow);
        
// Split in 2 Schleifen; zuerst alle Daten in ein Array abspeichern
        for (let i = 0; i < weathers.length; i++) {
            const tr = document.createElement('tr');
            let daylabel = '';
            if (i == 0){
                daylabel = 'Heute ' + weathers[i].date;
            } else if (i == 1){
                daylabel = 'Morgen ' + weathers[i].date;
            } else{
                daylabel = weathers[i].date;
            }
// kommen so von der loadWeather retour
            const values = [
                daylabel,
// sind Daten von weathers[i] da? dann nimm die; sonst leer
                weathers[i].weather ? weathers[i].weather['Temperatur minimum'] : 'Keine Daten',
                weathers[i].weather ? weathers[i].weather['Temperatur maximum'] : '',
                weathers[i].weather ? weathers[i].weather['Wetterlage'] : '',
                weathers[i].weather ? weathers[i].weather['Wetterwarnung'] : ''
            ];
// Dann mit dem Array die Tabelle erstellen
            for (let j = 0; j < values.length; j++) {
                const td = document.createElement('td');
                td.textContent = values[j];
                tr.appendChild(td);
            }

            const icon = document.createElement('td');
            if (weathers[i].weather) {
// https://www.mediaevent.de/javascript/image.html
                const img = document.createElement('img');
                img.src = this.weatherIcons(weathers[i].weather['Wetterlage']);
                img.style.width = '40px';
                icon.appendChild(img);
            }
            tr.appendChild(icon)
            table.appendChild(tr);
        }
        this.outputWeather.appendChild(table);
    }

}