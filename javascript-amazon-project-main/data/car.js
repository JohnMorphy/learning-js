class Car {
    _brand;
    _model;
    speed = 0;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.brand = carDetails.brand;
        this._model = carDetails.model;
    };

    displayInfo() {
        const trunkMessage = this.isTrunkOpen ? 'with open trunk' : 'trunk closed'
        console.log(`${this._brand} ${this._model}, Speed: ${this.speed}, ${trunkMessage}`);
    };

    go() {
        if (this.isTrunkOpen) {
            return;
        }

        if (this.speed + 50 > 200) {
            this.speed = 200
        } else {
            this.speed += 50;
        }
    };

    break() {
        if (this.speed - 10 < 0) {
            this.speed = 0;
        } else {
            this.speed -= 10;
        }
    };

    stop() {
        this.speed = 0;
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    };

    closeTrunk() {
        this.isTrunkOpen = false;
    }

    displayInfo() {
        const trunkMessage = this.isTrunkOpen ? 'with open trunk' : 'trunk closed'
        console.log(`${this._brand} ${this._model}, Speed: ${this.speed}, ${trunkMessage}`);
    };
}

class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    openTrunk() { console.log('No trunk on the race car!') };
    closeTrunk() { console.log('No trunk on the race car!') };

    go() {
        if (this.speed + this.acceleration > 300) {
            this.speed = 300
        } else {
            this.speed += this.acceleration;
        }
    };

    displayInfo() {
        console.log(`${this._brand} ${this._model}, Speed: ${this.speed}, Acceleration: ${this.acceleration}`);
    };

}

const car1 = new Car({ brand: 'Toyota', model: 'Corolla' });
const car2 = new Car({ brand: 'Tesla', model: 'Model 3' });
const raceCar1 = new RaceCar({ brand: 'McLaren', model: 'F1', acceleration: 80 })

car1.go();
car1.go();
car1.go();
car1.break();

car2.break();
car2.go();
car2.stop();
car2.openTrunk();
car2.go();

raceCar1.openTrunk();
raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.break();

car1.displayInfo();
car2.displayInfo();
raceCar1.displayInfo();

