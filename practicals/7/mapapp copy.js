
const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);

map.setView([50.908, -1.4], 14);


const solent = L.circle([50.9079, -1.4015], { radius:100, fillColor: 'blue',
                                color: 'red', opacity: 0.5 }).addTo(map); 


// Saints stadium (football ground)
const saints = L.polygon ( [
        [50.9063 , -1.3914 ] ,
        [50.9063 , -1.3905 ] ,
        [50.9053 , -1.3905 ] ,
        [50.9053 , -1.3914 ]
        ], { color: 'green' } ).addTo(map);

// Route to railway station
const routeToStation = L.polyline ( [
        [50.9079, -1.4015] ,
        [50.9071, -1.4015], 
        [50.9069, -1.4047],
        [50.9073, -1.4077],
        [50.9081, -1.4134] 
        ]).addTo(map);
        
solent.bindPopup("Solent University");
saints.bindPopup("Saints stadium");
routeToStation.bindPopup("Route to station");