const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-9.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-9.input'), 'utf-8').split('\r\n');

const isKnotsStillAdjacents = (firstKnot, secondKnot) => {
    return (firstKnot.x === secondKnot.x && firstKnot.y === secondKnot.y) ||
        (firstKnot.x === secondKnot.x && firstKnot.y + 1 === secondKnot.y) ||
        (firstKnot.x === secondKnot.x && firstKnot.y - 1 === secondKnot.y) ||
        (firstKnot.y === secondKnot.y && firstKnot.x + 1 === secondKnot.x) ||
        (firstKnot.y === secondKnot.y && firstKnot.x - 1 === secondKnot.x) ||
        (firstKnot.x - 1 === secondKnot.x && firstKnot.y - 1 === secondKnot.y) ||
        (firstKnot.x + 1 === secondKnot.x && firstKnot.y + 1 === secondKnot.y) ||
        (firstKnot.x - 1 === secondKnot.x && firstKnot.y + 1 === secondKnot.y) ||
        (firstKnot.x + 1 === secondKnot.x && firstKnot.y - 1 === secondKnot.y);
};

const moveKnot = (firstKnot, secondKnot) => {
    const diffX = Math.abs(firstKnot.x - secondKnot.x);
    const diffY = Math.abs(firstKnot.y - secondKnot.y);

    if (diffX > 1) {
        secondKnot.x += (firstKnot.x > secondKnot.x) ? 1 : -1;
        
        if (firstKnot.y > secondKnot.y) {
            secondKnot.y += 1;
        } else if (firstKnot.y < secondKnot.y) {
            secondKnot.y -= 1;
        }
    } else if (diffY > 1) {
        secondKnot.y += (firstKnot.y > secondKnot.y) ? 1 : -1;

        if (firstKnot.x > secondKnot.x) {
            secondKnot.x += 1;
        } else if (firstKnot.x < secondKnot.x) {
            secondKnot.x -= 1;
        }
    }
};

const moveRope = (direction, steps, knotsPositions) => {
    const tailPositions = [];
    const isUpMovement = direction === 'U';
    const isRightMovement = direction === 'R';
    const isDownMovement = direction === 'D';
    const isLeftMovement = direction === 'L';

    if (isUpMovement) {
        for (let i = 0; i < steps; i++) {
            knotsPositions[0].y += 1;

            for (let j = 1; j < knotsPositions.length; j++) {
                let currentKnot = knotsPositions[j];
                let previousKnot = knotsPositions[j - 1];

                if (!isKnotsStillAdjacents(previousKnot, currentKnot)) {
                    moveKnot(previousKnot, currentKnot);
                }
            }

            tailPositions.push(Object.assign({}, knotsPositions[9]));
        }
    } else if (isRightMovement) {
        for (let i = 0; i < steps; i++) {
            knotsPositions[0].x += 1;

            for (let j = 1; j < knotsPositions.length; j++) {
                let currentKnot = knotsPositions[j];
                let previousKnot = knotsPositions[j - 1];

                if (!isKnotsStillAdjacents(previousKnot, currentKnot)) {
                    moveKnot(previousKnot, currentKnot);
                }
            }

            tailPositions.push(Object.assign({}, knotsPositions[9]));
        }
    } else if (isDownMovement) {
        for (let i = 0; i < steps; i++) {
            knotsPositions[0].y -= 1;

            for (let j = 1; j < knotsPositions.length; j++) {
                let currentKnot = knotsPositions[j];
                let previousKnot = knotsPositions[j - 1];

                if (!isKnotsStillAdjacents(previousKnot, currentKnot)) {
                    moveKnot(previousKnot, currentKnot);
                }
            }

            tailPositions.push(Object.assign({}, knotsPositions[9]));
        }
    } else if (isLeftMovement) {
        for (let i = 0; i < steps; i++) {
            knotsPositions[0].x -= 1;

            for (let j = 1; j < knotsPositions.length; j++) {
                let currentKnot = knotsPositions[j];
                let previousKnot = knotsPositions[j - 1];

                if (!isKnotsStillAdjacents(previousKnot, currentKnot)) {
                    moveKnot(previousKnot, currentKnot);
                }
            }

            tailPositions.push(Object.assign({}, knotsPositions[9]));
        }
    }

    return tailPositions;
};

const getUniqueNewTailPositions = (newTailPositions, uniqueVisitedPositions) => {
    for (let i = 0; i < newTailPositions.length; i++) {
        let position = newTailPositions[i];

        if (!uniqueVisitedPositions.find(p => p.x === position.x && p.y === position.y)) {
            uniqueVisitedPositions.push(position);
        }
    }
};

const simulateRopeMovement = (input) => {
    let uniqueVisitedPositions = [];
    const startPosition = { x: 0, y: 0 };
    uniqueVisitedPositions.push(startPosition);
    let knotsPositions = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 }
    ];

    for (let i = 0; i < input.length; i++) {
        let currentMovement = input[i].split(' ');
        let direction = currentMovement[0];
        let steps = parseInt(currentMovement[1]);

        let newTailPositions = moveRope(direction, steps, knotsPositions);
        getUniqueNewTailPositions(newTailPositions, uniqueVisitedPositions);
    }

    return uniqueVisitedPositions.length;
};

const uniquePositionsTailVisited = simulateRopeMovement(input);
console.log(uniquePositionsTailVisited);