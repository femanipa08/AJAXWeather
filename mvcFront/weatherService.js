// erste Überlegung verworfen, da es ja reicht die Tage für die Abfrage zu übergeben

export class weatherService{
    constructor(weatherDAO){
        this.weatherDAO = weatherDAO;
    }

    loadDate(days){
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
        const dates = [];
        for (let i = 0; i <= days; i++){
            const date = new Date();
            date.setDate(date.getDate() + i);

            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');

// https://stackoverflow.com/questions/17913681/how-do-i-use-tolocaletimestring-without-displaying-seconds
        dates.push({
            display: date.toLocaleDateString('de-DE', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
// so im String abspeichern, damit nach Filename ausgewählt werden kann
        filename: `${yyyy}_${mm}_${dd}`
        });
    }
    return dates;
    }

    async loadWeather(days) {
        const dates = this.loadDate(days);
        const weathers = [];
        for (const date of dates) {
            const data = await this.weatherDAO.loadFiles(date.filename);
// überprüft ob JSON Daten vorhanden sind
            if (data == null){
                weathers.push({date: date.display, weather: null});
            } else{
                weathers.push({date: date.display, weather: data[0]});
            }
        }
// console.log('weathers:', weathers);

        return weathers;
    }

// Daten für Chart
    dataChartWeather(weathers){
        const label = [];
        const min = [];
        const max = [];

        for (let i = 0; i < weathers.length; i++){
            label.push(weathers[i].date);
            min.push(weathers[i].weather ? weathers[i].weather['Temperatur minimum'] : null);
            max.push(weathers[i].weather ? weathers[i].weather['Temperatur maximum'] : null);
        }
// wird vom View abgerufen
// https://www.chartjs.org/docs/latest/general/data-structures.html
        return {
// x-Achse im Chart = labels
            labels: label,
// datasets entspricht einer Linie
            datasets:[
                {label: 'Minimum', data: min},
                {label: 'Maximum', data: max}
            ]
            
        }
    }
}

