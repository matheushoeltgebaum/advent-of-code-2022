const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-9.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-9.input'), 'utf-8').split('\r\n');

const isHeadAndTailStillAdjacents = (headPosition, tailPosition) => {
    return (headPosition.x === tailPosition.x && headPosition.y === tailPosition.y) || 
           (headPosition.x === tailPosition.x && headPosition.y + 1 === tailPosition.y) || 
           (headPosition.x === tailPosition.x && headPosition.y - 1 === tailPosition.y) || 
           (headPosition.y === tailPosition.y && headPosition.x + 1 === tailPosition.x) ||
           (headPosition.y === tailPosition.y && headPosition.x - 1 === tailPosition.x) ||
           (headPosition.x - 1 === tailPosition.x && headPosition.y - 1 === tailPosition.y) ||
           (headPosition.x + 1 === tailPosition.x && headPosition.y + 1 === tailPosition.y) ||
           (headPosition.x - 1 === tailPosition.x && headPosition.y + 1 === tailPosition.y) ||
           (headPosition.x + 1 === tailPosition.x && headPosition.y - 1 === tailPosition.y);
};

const isDifferentColumnPositions = (headPosition, tailPosition) => {
    return headPosition.x !== tailPosition.x;
};

const isDifferentRowPositions = (headPosition, tailPosition) => {
    return headPosition.y !== tailPosition.y;
};

const moveRope = (direction, steps, headPosition, tailPosition) => {
    const tailPositions = [];
    const isUpMovement = direction === 'U';
    const isRightMovement = direction === 'R';
    const isDownMovement = direction === 'D';
    const isLeftMovement = direction === 'L';

    if (isUpMovement) {
        for (let i = 0; i < steps; i++) {
            headPosition.y += 1;
            if (!isHeadAndTailStillAdjacents(headPosition, tailPosition)) {
                if (isDifferentColumnPositions(headPosition, tailPosition)) {
                    tailPosition.x = headPosition.x;
                }

                tailPosition.y += 1;
                tailPositions.push(Object.assign({}, tailPosition));
            }
        }
    } else if (isRightMovement) {
        for (let i = 0; i < steps; i++) {
            headPosition.x += 1;
            if (!isHeadAndTailStillAdjacents(headPosition, tailPosition)) {
                if (isDifferentRowPositions(headPosition, tailPosition)) {
                    tailPosition.y = headPosition.y;
                }

                tailPosition.x += 1;
                tailPositions.push(Object.assign({}, tailPosition));
            }
        }
    } else if (isDownMovement) {
        for (let i = 0; i < steps; i++) {
            headPosition.y -= 1;
            if (!isHeadAndTailStillAdjacents(headPosition, tailPosition)) {
                if (isDifferentColumnPositions(headPosition, tailPosition)) {
                    tailPosition.x = headPosition.x;
                }

                tailPosition.y -= 1;
                tailPositions.push(Object.assign({}, tailPosition));
            }
        }
    } else if (isLeftMovement) {
        for (let i = 0; i < steps; i++) {
            headPosition.x -= 1;
            if (!isHeadAndTailStillAdjacents(headPosition, tailPosition)) {
                if (isDifferentRowPositions(headPosition, tailPosition)) {
                    tailPosition.y = headPosition.y;
                }

                tailPosition.x -= 1;
                tailPositions.push(Object.assign({}, tailPosition));
            }
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

    let headPosition = Object.assign({}, startPosition);
    let tailPosition = Object.assign({}, startPosition);

    for (let i = 0; i < input.length; i++) {
        let currentMovement = input[i].split(' ');
        let direction = currentMovement[0];
        let steps = parseInt(currentMovement[1]);

        let newTailPositions = moveRope(direction, steps, headPosition, tailPosition);
        getUniqueNewTailPositions(newTailPositions, uniqueVisitedPositions);
    }

    return uniqueVisitedPositions.length;
};

const uniquePositionsTailVisited = simulateRopeMovement(input);
console.log(uniquePositionsTailVisited);