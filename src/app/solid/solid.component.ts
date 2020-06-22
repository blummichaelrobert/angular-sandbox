import { Component } from '@angular/core';


@Component({
    selector: 'solid',
    templateUrl: './solid.component.html',
    styleUrls: ['./solid.component.css'],
    providers: []
})

export class SolidComponent {

    constructor() { }

}

abstract class Employee {
    // This needs to be implemented
    abstract calculatePay(): number;
    // This needs to be implemented
    abstract reportHours(): number;
    // let's assume THIS is going to be the 
    // same algorithm for each employee- it can
    // be shared here.
    protected save(): Promise<any> {
        // common save algorithm
        return new Promise((resolve, reject) => {

        });
    }
}

class HR extends Employee {
    calculatePay(): number {
        // implement own algorithm
        return 1;
    }
    reportHours(): number {
        // implement own algorithm
        return 2;
    }
}

class Accounting extends Employee {
    calculatePay(): number {
        // implement own algorithm
        return 3;
    }
    reportHours(): number {
        // implement own algorithm
        return 4;
    }

}

class IT extends Employee {
    calculatePay(): number {
        // implement own algorithm
        return 5;
    }
    reportHours(): number {
        // implement own algorithm
        return 6;
    }
}
