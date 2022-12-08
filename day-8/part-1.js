const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-8.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-8.input'), 'utf-8').split('\r\n');

const getEdgeTreesCount = (treesLines) => {
    let visibleTreesPerLine = 2;
    let firstColumnTrees = treesLines[0].length - 2;
    let lastColumnTrees = treesLines[treesLines.length - 1].length - 2;

    return (treesLines.length * visibleTreesPerLine) + firstColumnTrees + lastColumnTrees;
};

const isTreeVisibleFromTop = (treeHeight, trees, currentLine, currentColumn) => {
    for (let i = 0; i < currentLine; i++) {
        let currentTreeHeight = parseInt(trees[i][currentColumn]);
        if (currentTreeHeight >= treeHeight) {
            return false;
        }
    }

    return true;
};

const isTreeVisibleFromBottom = (treeHeight, trees, currentLine, currentColumn) => {
    for (let i = currentLine + 1; i < trees.length; i++) {
        let currentTreeHeight = parseInt(trees[i][currentColumn]);
        if (currentTreeHeight >= treeHeight) {
            return false;
        }
    }

    return true;
};

const isTreeVisibleFromLeft = (treeHeight, trees, currentLine, currentColumn) => {
    for (let j = 0; j < currentColumn; j++) {
        let currentTreeHeight = parseInt(trees[currentLine][j]);
        if (currentTreeHeight >= treeHeight) {
            return false;
        }
    }

    return true;
};

const isTreeVisibleFromRight = (treeHeight, trees, currentLine, currentColumn) => {
    for (let j = currentColumn + 1; j < trees[currentLine].length; j++) {
        let currentTreeHeight = parseInt(trees[currentLine][j]);
        if (currentTreeHeight >= treeHeight) {
            return false;
        }
    }

    return true;
};

const processVisibleTrees = (trees) => {
    let visibleTreesCount = 0;

    for (let i = 1; i < trees.length - 1; i++) {
        for (let j = 1; j < trees[i].length - 1; j++) {
            let currentTreeHeight = parseInt(trees[i][j]);
            let isVisibleFromTop = isTreeVisibleFromTop(currentTreeHeight, trees, i, j);
            let isVisibleFromBottom = isTreeVisibleFromBottom(currentTreeHeight, trees, i, j);
            let isVisibleFromLeft = isTreeVisibleFromLeft(currentTreeHeight, trees, i, j);
            let isVisibleFromRight = isTreeVisibleFromRight(currentTreeHeight, trees, i, j);

            if (isVisibleFromTop || isVisibleFromBottom || isVisibleFromLeft || isVisibleFromRight) {
                visibleTreesCount++;
            }
        }
    }

    visibleTreesCount += getEdgeTreesCount(trees);
    return visibleTreesCount;
};

const visibleTreesCount = processVisibleTrees(input);
console.log(visibleTreesCount);