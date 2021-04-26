
async function ajaxSearch(artist) {
    // Send a request to our remote URL
    const response = await fetch(`http://localhost:3000/artist/${artist}`);

    // Parse the JSON.
    const results = await response.json();

    // Loop through the array of JSON objects and add the results to a <div>
    document.getElementById('results').innerHTML = "";
    results.forEach ( song => {
        var p1 = document.createElement("p");
        var btn = document.createElement("input");
        btn.type = "button";
        btn.value = "buy";
        var text1 = document.createTextNode(`
        ${song.title}
        ${song.artist}
        ${song.year}
        ${song.quantity}`)
        btn.addEventListener("click", e =>{
            console.log ("working")
            buy(song.ID)
            alert("you brought a song")
        })
        p1.appendChild(text1)
        p1.appendChild(btn)
        document.getElementById('results').appendChild(p1);
   
    });

    
    document.getElementById('results').innerHTML = html;
}

async function buy(songID) {
   console.log(songID)
    const response = await fetch(`http://localhost:3000/products/${songID}/buy`, {method: 'POST'})
    if(response.status == 200) {
            alert("The product was sucessfully brought");
    } else {
            alert("try again");
        };

};


// Make the AJAX run when we click a button
document.getElementById('btn1').addEventListener('click', ()=> {
    // Read the product type from a text field
    const artist = document.getElementById('artistName').value;
    ajaxSearch(artist);
});


document.getElementById('btnType').addEventListener('click', ()=> {
    // Read the product type from a text field
    const category = document.getElementById('searchType').value;
    console.log(category);
    const type = document.getElementById('typefield').value;
    ajaxSearch(type);
});