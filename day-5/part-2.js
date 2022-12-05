const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-5.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-5.input'), 'utf-8').split('\r\n');

const STACKS_OF_CRATES = {
    // 1: ['Z', 'N'],
    // 2: ['M', 'C', 'D'],
    // 3: ['P']

    1: ['F', 'H', 'B', 'V', 'R', 'Q', 'D', 'P'],
    2: ['L', 'D', 'Z', 'Q', 'W', 'V'],
    3: ['H', 'L', 'Z', 'Q', 'G', 'R', 'P', 'C'],
    4: ['R', 'D', 'H', 'F', 'J', 'V', 'B'],
    5: ['Z', 'W', 'L', 'C'],
    6: ['J', 'R', 'P', 'N', 'T', 'G', 'V', 'M'],
    7: ['J', 'R', 'L', 'V', 'M', 'B', 'S'],
    8: ['D', 'P', 'J'],
    9: ['D', 'C', 'N', 'W', 'V']
};

const getInstruction = (instruction) => {
    const info = instruction.split(' ');
    
    const amountOfCrates = parseInt(info[1]);
    const originStack = parseInt(info[3]);
    const destinationStack = parseInt(info[5]);

    return {
        amountOfCrates,
        originStack,
        destinationStack
    };
};

const moveCrates = (instruction) => {
    let elementsToMove = [];

    for (let i = 0; i < instruction.amountOfCrates; i++) {
        let element = STACKS_OF_CRATES[instruction.originStack].pop();
        elementsToMove.push(element);
    }

    for (let i = elementsToMove.length - 1; i >= 0; i--) {
        let element = elementsToMove[i];
        STACKS_OF_CRATES[instruction.destinationStack].push(element);
    }
};

const processCratesRearrangement = (instructions) => {
    for (let i = 0; i < instructions.length; i++) {
        let currentInstruction = getInstruction(instructions[i]);
        
        moveCrates(currentInstruction);
    }
};

const getCratesAtTopInEachStack = () => {
    let cratesAtTop = '';

    for (let stack in STACKS_OF_CRATES) {
        let currentStack = STACKS_OF_CRATES[stack];
        let stackLength = currentStack.length;

        cratesAtTop += currentStack[stackLength - 1];
    }

    return cratesAtTop;
};

processCratesRearrangement(input);
const cratesAtTop = getCratesAtTopInEachStack();
console.log(cratesAtTop);