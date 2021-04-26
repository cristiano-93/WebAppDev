const map = L.map("map1");

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);

const pos = [52.1459, 0.0913];
map.setView(pos, 18);

async function checkLogin(){

    const response = await fetch("/login");
    
    if(response.status==200){
        const results = await response.json();
        if(results.username != null){
            console.log(results);
            document.getElementById('message').style.display="block"
            document.getElementById('message').innerHTML = `logged in as ${results.username}` ;
            document.getElementById('loginForm').style.display="none"
            document.getElementById('logoutBtn').style.display= "block"
        }
        else{
            document.getElementById('loginForm').style.display="block"
        }

    } 
} 
checkLogin()



async function login(){
    const body = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };    
    const response = await fetch("/login", {method:"POST",headers:{'Content-type': 'application/json'},body:JSON.stringify(body)});

    if(response.status==200){
        const results = await response.json();
        console.log(results);
        document.getElementById('message').style.display="block"
        document.getElementById('message').innerHTML = `logged in as ${results.username}` ;
        document.getElementById('loginForm').style.display="none"
        document.getElementById('logoutBtn').style.display= "block"
    } else{
        window.alert("could not log in")
    }

}

document.getElementById('loginBtn').addEventListener('click', () => {
    console.log(username + password);
    login(username, password);
});


async function ajaxSearch(artist) {
    // Send a request to our remote URL
    const response = await fetch(`http://localhost:3000/song/artist/${artist}`);

    // Parse the JSON.
    const results = await response.json();

    // Loop through the array of JSON objects and add the results to a <div>
    document.getElementById('results').innerHTML = "";
    results.forEach(song => {
        var p1 = document.createElement("p");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = "buy";
        var text1 = document.createTextNode(`
        ${song.title}
        ${song.artist}
        ${song.year}
        ${song.quantity}`)
        btn.addEventListener("click", e => {
            console.log("working")
            buy(song.ID)
        })
        p1.appendChild(text1)
        p1.appendChild(btn)
        document.getElementById('results').appendChild(p1);

    });


    document.getElementById('results').innerHTML = html;
}

async function buy(songID) {
    console.log(songID)
    const response = await fetch(`http://localhost:3000/song/products/${songID}/buy`, { method: 'POST' })

    if (response.status == 200) {
        alert("The product was successfully brought")
    } 
    else if (response.status == 401){
        alert("please log in") 
    }
    else {
        alert("error in buying please try again");
    };

};


// Make the AJAX run when we click a button
document.getElementById('btn1').addEventListener('click', () => {
    // Read the product type from a text field
    const artist = document.getElementById('artistName').value;
    ajaxSearch(artist);
});


document.getElementById('btnType').addEventListener('click', () => {
    // Read the product type from a text field
    const category = document.getElementById('searchType').value;
    console.log(category);
    const type = document.getElementById('typefield').value;
    ajaxSearch(type);
});


async function locate(artist) {

    const response = await fetch(`http://localhost:3000/song/hometown/${artist}`)
    const result = await response.json();
    console.log(results);
    const lat = result[0].lat;
    const lng = result[0].lon;
    const position = [lat, lng]

    const marker = L.marker(position).addTo(map);

    map.setView(position, 14);
    marker.bindPopup(`this is the hometown of ${artist}`)

}




document.getElementById('btn2').addEventListener('click', () => {

    const search = document.getElementById(`artistName`).value;
    console.log(search);
    locate(search);

});






async function logout(){

    const response = await fetch("/logout" );
    if(response.status==200){
        const results = await response.json();
        console.log(results);
        document.getElementById('logoutBtn').style.display = "none";
        document.getElementById('message').style.display = "none";
        document.getElementById('loginForm').style.display="block";
    } else{
        window.alert("could not log out")
    }
}
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout(username, password);
});