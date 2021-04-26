document.getElementById("btn1").addEventListener("click", clickHandler);
    
function clickHandler() {
    
    const colour = document.getElementById('backgroundColor').value;
    document.getElementById('div1').style.backgroundColor= colour;
}
