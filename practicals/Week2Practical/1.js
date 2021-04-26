document.getElementById("btn1").addEventListener("click", () => {

    const colour = document.getElementById('backgroundColor').value;
    document.getElementById('div1').style.backgroundColor= colour;

    const colourtext = document.getElementById('textchange').value;
    document.getElementById('header').style.color= colourtext;;

});



document.getElementById("seasons").addEventListener("click", ()=> { 
    const englishseasons = ["spring", "summer", "autumn", "winter"];
    const germanseasons = ["Fruehling", "Sommer", "Herbst", "Winter"];

    for(let i=0; i<=3; i++)
    {
        alert (`The first month of the year is ${englishseasons[i]} The first month of the year is ${germanseasons[i]}`);
    }
} );
    


