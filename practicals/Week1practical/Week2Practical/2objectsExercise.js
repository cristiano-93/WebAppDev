document.getElementById("btn1").addEventListener("click", () => {
    {
        const car = {
            make: "Honda",
            model: "Capa",
            engineCapacity: 1493,
            topSpeed: 100,
            currentSpeed: 0,
        
            decelerate: function()
            {
                if (this.currentSpeed >= 0){

                    this.currentSpeed-=5;

                }
                else{
                    "start your engine"
                }

            },
    
            accelerate: function(amount)
            {
                if (this.currentSpeed + amount <= this.topSpeed){

                    this.currentSpeed+=amount;

                }
                else{
                    alert("woah slow down")
                }
            },
            toString: function() { return `${this.make} ${this.model} ${this.engineCapacity} ${this.topSpeed} ${this.currentSpeed}`; }
        };

        
        alert(car);
        car.accelerate(300);
        alert(car);
    }
});

