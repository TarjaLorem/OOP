class SlotMachine {
    constructor(slotMoney) {
        this.slotMoney = slotMoney;
        this.number = '';
    }
    randomNumber(number) {
        let rand = this.number;
        for (let i = 0; i < 3; i++) {
            rand += Math.floor(Math.random() * 10).toString();
        }
        console.log('Generate number - ' + rand);
        return rand;
    }
    playTheGame(number) {
        var game = this.randomNumber();

        if (game === '777') {
            return this.slotMoney;
        } else if (game[0] === game[1] || game[0] === game[2] || game[1] === game[2]) {
            this.slotMoney -= number * 4;
            return number * 4;
        }
        return 'Fail! Goodbay money!';
    }
    allMoney() {
        return 'Remainder of money - ' + this.slotMoney;
    }
    getMoney(sum) {
        if (sum < this.slotMoney) {
            return 'Withdraw of money - ' + sum + '. Remainder - ' + (this.slotMoney - sum);
        }
        return 'You are trying to exept the non-existent sum';
    }
    addMoney(addingSum) {
        return 'Added sum - ' + addingSum + '. General sum - ' + (this.slotMoney += addingSum);
    }
}
class Casino {
    constructor(quantitySlotMachine, bank) {
        this.quantitySlotMachine = quantitySlotMachine;
        this.bank = bank;
        this.machinesInstanses = [];
        let random = Math.floor(Math.random() * this.quantitySlotMachine);
        let reminder = bank % quantitySlotMachine;
        let amountToInitialize = (bank - reminder) / quantitySlotMachine;
        this.lucky = false;
        this.initializeInstances(random, amountToInitialize, reminder);
    }
    initializeInstances(random, amountToInitialize, reminder) {
        for (let i = 0; i < this.quantitySlotMachine; i++) {
            if (i === 0 && i === random) {
                this.machinesInstanses.push(new SlotMachine(amountToInitialize + reminder));
            } else if (i === random) {
                this.machinesInstanses.push(this.lucky = new SlotMachine(amountToInitialize));
            } else if (i === 0) {
                this.machinesInstanses.push(new SlotMachine(amountToInitialize + reminder));
            }
            this.machinesInstanses.push(new SlotMachine(amountToInitialize));
        }
    }
    allMoney() {
        return this.bank;
    }
     allMachines() {
        return this.machinesInstanses.length;
    }
    addNewMachine() {
        let maxMoney = 0;
        let donorMachine = [];
        for (let i of this.machinesInstanses) {
            if (i.money > maxMoney) {
                maxMoney = i.money;
                donorMachine = i;
            }
            donorMachine.money -= donorMachine.money / 2;
            this.machinesInstanses.push(new SlotMachine(donorMachine.money / 2));
            return 'This machine was added. General sum of machine - ' + this.machinesInstanses.length;
        }
    }
    removeMachine(number) {
        if (this.machinesInstanses.length > number) {
            let removedMoney = this.machinesInstanses[number - 1].money / this.machinesInstanses.length - 1;
            this.machinesInstanses.splice(number - 1, 1);
            for (let i of this.machinesInstanses) {
                i.money += removedMoney;
            }
            return 'Namber of machine - ' + number + ' deleted. Reminder - ' + this.machinesInstanses.length
        }
        return 'This machine was deleted.';
    }
    getMoney(sum) {
        if (sum < this.bank) {
            let sumOfMoney = 0;
            for (let i of this.machinesInstanses.sort((max, min) => {
                    return max.money - min.money
                })) {
                if (sumOfMoney < sum && (sum - sumOfMoney) > i.money) {
                    sumOfMoney += i.money;
                    i.money = 0;
                } else if (sumOfMoney < sum && (sum - sumOfMoney) < i.money) {
                    while (sum != sumOfMoney) {
                        sumOfMoney++;
                        i.money--;
                    }
                }
            }
            return 'Non-existent sum is - ' + sum + '. Reminder sum - ' + (this.bank -= sum);
        }
    }
}
var casino = new Casino(10, 5831);
console.log('General sum in casino - ' + casino.allMoney());
console.log('Count of machine - ' + casino.allMachines());
console.log(casino.addNewMachine());
console.log(casino.removeMachine(5));
console.log(casino.getMoney(500));

var machine = new SlotMachine(500);
console.log(machine.playTheGame(5))
console.log(machine.allMoney());
console.log(machine.getMoney(200));
console.log(machine.addMoney(173));
