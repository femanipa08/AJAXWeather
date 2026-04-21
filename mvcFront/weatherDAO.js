export class weatherDAO{
    async loadFiles(filename){
        return fetch(`http://127.0.0.1:3000/AJAXWeather/JSON/${filename}.json`)
                .then(response => response.json())
                .then(data => data.Wetterdaten)
                .catch(() => null);
        };
}