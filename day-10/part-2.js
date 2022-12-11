const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-10.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-10.input'), 'utf-8').split('\r\n');

const checkToPrintCTRRow = (currentCRTRow, currentCycle) => {
    const cyclesToPrint = [40, 80, 120, 160, 200, 240];

    if (cyclesToPrint.includes(currentCycle)) {
        console.log(currentCRTRow);
        return '';
    }

    return currentCRTRow;
}

const drawNewPixelInCRTRow = (currentCRTRow, X) => {
    let rowLength = currentCRTRow.length;
    let isDrawLitPixel = Math.abs(rowLength - X) <= 1;

    if (isDrawLitPixel) {
        currentCRTRow += '#';
    } else {
        currentCRTRow += '.';
    }

    return currentCRTRow;
};

const processCPU = (instructions) => {
    let X = 1;
    let currentCycle = 1;
    let currentCRTRow = '#';

    for (let i = 0; i < instructions.length; i++) {
        let currentInstruction = instructions[i];

        if (currentInstruction === 'noop') {
            currentCycle++;
            currentCRTRow = drawNewPixelInCRTRow(currentCRTRow, X);
            currentCRTRow = checkToPrintCTRRow(currentCRTRow, currentCycle);
        } else {
            currentCycle++;
            currentCRTRow = drawNewPixelInCRTRow(currentCRTRow, X);
            currentCRTRow = checkToPrintCTRRow(currentCRTRow, currentCycle);

            let value = parseInt(currentInstruction.split(' ')[1]);
            X += value;

            currentCycle++;
            currentCRTRow = drawNewPixelInCRTRow(currentCRTRow, X);
            currentCRTRow = checkToPrintCTRRow(currentCRTRow, currentCycle);
        }
    }
};

processCPU(input);