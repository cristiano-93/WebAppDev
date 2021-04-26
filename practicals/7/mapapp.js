const map = L.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);

const pos = [52.1459, 0.0913];
map.setView(pos, 18);

L.marker(pos).addTo(map);

map.on("click", e => {
    // "e.latlng" is an object (of type L.LatLng) representing the mouse click 
    // position
    // It has two properties, "lat" is the latitude and "lng" is the longitude.

    alert(`You clicked at:${e.latlng.lat} ${e.latlng.lng}`);

    let place = [e.latlng.lat, e.latlng.lng]
    L.marker(place).addTo(map);


});

document.getElementById("clear").addEventListener("click", () => {
    map.removeLayer(place)
})


