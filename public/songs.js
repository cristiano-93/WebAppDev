const map = L.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);

const pos = [40.91842, -8.51741];
map.setView(pos, 14);


async function ajaxArtistSearch(search) {
    const response = await fetch(`http://localhost:3000/songs/artist/${search}`);
    const results = await response.json();

    document.getElementById('results').innerHTML = "";
    results.forEach(song => {
        var p1 = document.createElement("p");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = "Buy";
        var buyQ = document.createElement("input");
        buyQ.setAttribute("type", "text");
        buyQ.setAttribute("id", "buyQuantity")
        var text1 = document.createTextNode(`
            ${song.title}
            ${song.artist}
            ${song.year}
            ${song.quantity}`)
        btn.addEventListener("click", e => {
            console.log("working")
            console.log(buyQ)
            buy(song.ID, document.getElementById("buyQuantity").value)


        })
        p1.appendChild(text1)
        p1.appendChild(buyQ)
        p1.appendChild(btn)
        document.getElementById('results').appendChild(p1);
    })

};

document.getElementById('ajaxButton').addEventListener('click', () => {
    // Read the product type from a text field
    const search = document.getElementById('searchInput').value;
    ajaxArtistSearch(search);
});

async function buy(songId, buyQ) {
    console.log("song id: " + songId)

    const response = await fetch(`http://localhost:3000/songs/buy/${songId}/${buyQ}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(buyQ)
    const results = await response.json();
    if (results.quantity = 0) {
        alert("Song is out of stock")
    }
    alert("song stock is now "+results[0].quantity-buyQ)

};

async function locate(artist) {
    const response = await fetch(`http://localhost:3000/hometown/${artist}`)
    const results = await response.json();
    console.log(results);
    const lat = results[0].lat;
    const lng = results[0].lon;
    const position = [lat, lng]


    const marker = L.marker(position).addTo(map);

    map.setView(position, 14);
    marker.bindPopup(`This is the hometown of ${results[0].name}`)
};
document.getElementById('ajaxButton2').addEventListener('click', () => {
    const search = document.getElementById('searchInput').value;
    console.log(search);
    locate(search);
});

async function login(){
    const body = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    
    const response = await fetch("/login", {method:"POST",headers:{'Content-type': 'application/json'},body:JSON.stringify(body)});

    const results = await response.json();
    if(results){
        document.getElementById('loginForm').innerHTML = `logged in as ${results.username}`;
    } else{
        window.alert("could not log in")
    }
}

document.getElementById('loginBtn').addEventListener('click', () => {
    // const username = document.getElementById('username');
    // const password = document.getElementById('password');
    console.log(username + password);
    login(username, password);
});
