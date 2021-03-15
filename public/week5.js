
async function ajaxArtistSearch(artist) {
    const response = await fetch(`http://localhost:3000/songs/artist/${artist}`);
    const results = await response.json();
    // Loop through the array of JSON objects and add the results to a <div>
    let html = "<table> <tr> <th>Song name</th> <th>artist</th> <th>year</th>";
    let isClassic;
    
    results.forEach(song => {
        if (song.year < 2000) {
            isClassic = `Classic Hit`;
        } else {
            isClassic = ``;
        }
        html += `
        <tr>
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${song.year}</td>
        <td>${isClassic}</td>
        <td><input type='button' value='Buy!' onclick='buy(${song.ID})'/></td>
        </tr>`
    });
    html += `</table>`;
    document.getElementById('results').innerHTML = html;
}

// Make the AJAX run when we click a button
document.getElementById('ajaxButton').addEventListener('click', () => {
    // Read the product type from a text field
    const artist = document.getElementById('artistName').value;
    ajaxArtistSearch(artist);
});

async function buy(songId) {
    console.log(songId)
    const response = await fetch(`http://localhost:3000/songs/buy/${songId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
};