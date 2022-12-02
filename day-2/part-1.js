const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-2.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-2.input'), 'utf-8').split('\r\n');

const getShapeScore = (shape) => {
    switch (shape) {
        case 'X':
            return 1;
        case 'Y':
            return 2;
        case 'Z':
            return 3;
        default:
            return 0;
    }
};

const getOutcomeScore = (opponentShape, yourShape) => {
    const win = (
        (opponentShape === 'A' && yourShape === 'Y') ||
        (opponentShape === 'B' && yourShape === 'Z') ||
        (opponentShape === 'C' && yourShape === 'X')
    );

    const draw = (
        (opponentShape === 'A' && yourShape === 'X') ||
        (opponentShape === 'B' && yourShape === 'Y') ||
        (opponentShape === 'C' && yourShape === 'Z')
    );

    if (win) {
        return 6;
    } else if (draw) {
        return 3;
    }

    return 0;
};

const processRounds = (input) => {
    let score = 0;

    for (let i = 0; i < input.length; i++) {
        let round = input[i];
        let moves = round.split(' ');
        let opponentShape = moves[0];
        let yourShape = moves[1];
        let yourShapeScore = getShapeScore(yourShape);
        let roundOutcomeScore = getOutcomeScore(opponentShape, yourShape);

        score += yourShapeScore + roundOutcomeScore;
    }

    return score;
};

const score = processRounds(input);
console.log(score);