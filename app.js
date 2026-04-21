// wenn "keine Daten" in der Tabelle im Browser angezeigt wird, evtl JSON Titel neu setzen
import {weatherDAO} from "./mvcFront/weatherDAO.js";
import {weatherService} from "./mvcFront/weatherService.js";
import {weatherView} from "./mvcFront/weatherView.js";
import {weatherChart as WeatherChart} from "./statistic/weatherChart.js";

let dao = new weatherDAO();
let service = new weatherService(dao);
let chart = new WeatherChart(service);
let view = new weatherView(service, chart);

view.showDate();

// Wettergrafiken: <a href="http://www.freepik.com">Designed by Bamdewanto / Freepik</a>
// F2 um alle const in einer funktion umzubennen