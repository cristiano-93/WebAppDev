document.getElementById("btn1").addEventListener("click", clickHandler);

function clickHandler() {
    
    window.location = `http://localhost:5500/artist/`+ document.getElementById('artistName').value; 
}

console.log()