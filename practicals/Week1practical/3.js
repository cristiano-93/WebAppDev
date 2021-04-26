


document.getElementById("btn1").addEventListener("click", clickHandler);
document.getElementById("seasons").addEventListener("click", seasonHander);
    
function clickHandler() {
    
    const colour = document.getElementById('backgroundColor').value;
    document.getElementById('div1').style.backgroundColor= colour;

    const colourtext = document.getElementById('textchange').value;
    document.getElementById('header').style.color= colourtext;
}

function seasonHander(){

    const englishseasons = ["spring", "summer", "autumn", "winter"];
    const germanseasons = ["Fruehling", "Sommer", "Herbst", "Winter"];

    for(let i=0; i<=3; i++)
    {
        alert (`The first month of the year is ${englishseasons[i]} The first month of the year is ${germanseasons[i]}`);
    }

}
