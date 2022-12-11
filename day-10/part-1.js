const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-10.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-10.input'), 'utf-8').split('\r\n');

const checkSignalStrengthsSum = (currentCycle, X) => {
    const cycles = [20, 60, 100, 140, 180, 220];

    if (cycles.includes(currentCycle)) {
        return currentCycle * X;
    }

    return 0;
};

const processCPU = (instructions) => {
    let X = 1;
    let currentCycle = 1;
    let signalStrengthsSum = 0;

    for (let i = 0; i < instructions.length; i++) {
        let currentInstruction = instructions[i];

        if (currentInstruction === 'noop') {
            currentCycle++;
            signalStrengthsSum += checkSignalStrengthsSum(currentCycle, X);
        } else {
            currentCycle++;
            signalStrengthsSum += checkSignalStrengthsSum(currentCycle, X);

            let value = parseInt(currentInstruction.split(' ')[1]);
            X += value;

            currentCycle++;
            signalStrengthsSum += checkSignalStrengthsSum(currentCycle, X);
        }
    }

    return signalStrengthsSum;
};

const signalSum = processCPU(input);
console.log(signalSum);