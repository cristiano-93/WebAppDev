const map = L.map ("map1");

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            { attribution: attrib } ).addTo(map);
         
const pos = [40.91842, -8.51741];
map.setView(pos, 14);

map.on("click", e => {
	// "e.latlng" is an object (of type L.LatLng) representing the mouse click 
    L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
});