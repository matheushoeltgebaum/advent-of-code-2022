const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-2.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-2.input'), 'utf-8').split('\r\n');

const getShapeScore = (expectedOutcome, opponentShape) => {
    const draw = expectedOutcome === 'Y';
    const win = expectedOutcome === 'Z';

    if (win) {
        const winningShapeScore = {
            'A': 2,
            'B': 3,
            'C': 1
        };

        return winningShapeScore[opponentShape];
    } else if (draw) {
        const drawingShapeScore = {
            'A': 1,
            'B': 2,
            'C': 3
        };

        return drawingShapeScore[opponentShape];
    } else {
        const losingShapeScore = {
            'A': 3,
            'B': 1,
            'C': 2
        };

        return losingShapeScore[opponentShape];
    }
};

const getOutcomeScore = (expectedOutcome) => {
    const draw = expectedOutcome === 'Y';
    const win = expectedOutcome === 'Z';

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
        let expectedOutcome = moves[1];

        let yourShapeScore = getShapeScore(expectedOutcome, opponentShape);
        let roundOutcomeScore = getOutcomeScore(expectedOutcome);
        score += yourShapeScore + roundOutcomeScore;
    }

    return score;
};

const score = processRounds(input);
console.log(score);