
async function ajaxSearch(artist) {
    // Send a request to our remote URL
    const response = await fetch(`http://localhost:3000/artist/${artist}`);

    // Parse the JSON.
    const results = await response.json();

    // Loop through the array of JSON objects and add the results to a <div>
    let html = ` <table id="result"> <tr> <th> artist </th> <th> title </th> <th> year </th> </tr>`;
    results.forEach ( song => {
        html +=  `<tr> <td> ${song.artist} </td> <td> ${song.title}</td> <td> ${song.year} </td> <td> ${song.year < 2000 ? "classic hit" : ""} </td> <td> <input type='button' value='Buy!' onclick='buy(${song.ID})' <td> </tr>`;

    });
    html += ` </table> `
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