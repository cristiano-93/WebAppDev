
class Car{

    constructor (makeIn, modelIn, engineCapacityIn, topSpeedIn, currentSpeedIn ) {
        this.make= makeIn;
        this.model= modelIn ;
        this.engineCapacity= engineCapacityIn;
        this.topSpeed= topSpeedIn;
        this.currentSpeed= currentSpeedIn;
    }

    decelerate()
    {
        if (this.currentSpeed >= 0){

            this.currentSpeed-=5;

        }
        else{
            "start your engine"
        }

    }

    accelerate(amount)
    {
        if (this.currentSpeed + amount <= this.topSpeed){

            this.currentSpeed+=amount;

        }
        else{
            alert("woah slow down")
        }
    }

    toString() {return `${this.make} ${this.model} ${this.engineCapacity} ${this.topSpeed} ${this.currentSpeed}`; }
}

document.getElementById("btn1").addEventListener("click", () => {
    {
        const car1 = new Car ( "Honda",  "Capa",  1493,  100,  0);
        const car2 = new Car ( "jaguar",  "xj",  1900,  500, 0);
        alert(car1);
        car1.accelerate(300);
        alert(car2);
        car2.accelerate(300);
        alert(car2);
    }
});