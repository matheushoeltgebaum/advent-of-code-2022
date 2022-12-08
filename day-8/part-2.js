const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-8.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-8.input'), 'utf-8').split('\r\n');

const getVisibleTreesFromTop = (treeHeight, trees, currentLine, currentColumn) => {
    let visibleTrees = 0;

    for (let i = currentLine - 1; i >= 0; i--) {
        let currentTreeHeight = parseInt(trees[i][currentColumn]);
        visibleTrees++;

        if (currentTreeHeight >= treeHeight) {
            return visibleTrees;
        }
    }

    return visibleTrees;
};

const getVisibleTreesFromBottom = (treeHeight, trees, currentLine, currentColumn) => {
    let visibleTrees = 0;

    for (let i = currentLine + 1; i < trees.length; i++) {
        let currentTreeHeight = parseInt(trees[i][currentColumn]);
        visibleTrees++;

        if (currentTreeHeight >= treeHeight) {
            return visibleTrees;
        }
    }

    return visibleTrees;
};

const getVisibleTreesFromLeft = (treeHeight, trees, currentLine, currentColumn) => {
    let visibleTrees = 0;

    for (let j = currentColumn - 1; j >= 0; j--) {
        let currentTreeHeight = parseInt(trees[currentLine][j]);
        visibleTrees++;

        if (currentTreeHeight >= treeHeight) {
            return visibleTrees;
        }
    }

    return visibleTrees;
};

const getVisibleTreesFromRight = (treeHeight, trees, currentLine, currentColumn) => {
    let visibleTrees = 0;

    for (let j = currentColumn + 1; j < trees[currentLine].length; j++) {
        let currentTreeHeight = parseInt(trees[currentLine][j]);
        visibleTrees++;

        if (currentTreeHeight >= treeHeight) {
            return visibleTrees;
        }
    }

    return visibleTrees;
};

const processScenicScore = (trees) => {
    let highestScenicScore = 0;

    for (let i = 1; i < trees.length - 1; i++) {
        for (let j = 1; j < trees[i].length - 1; j++) {
            let currentTreeHeight = parseInt(trees[i][j]);
            let treesVisibleFromTop = getVisibleTreesFromTop(currentTreeHeight, trees, i, j);
            let treesVisibleFromBottom = getVisibleTreesFromBottom(currentTreeHeight, trees, i, j);
            let treesVisibleFromLeft = getVisibleTreesFromLeft(currentTreeHeight, trees, i, j);
            let treesVisibleFromRight = getVisibleTreesFromRight(currentTreeHeight, trees, i, j);

            let scenicScore = treesVisibleFromTop * treesVisibleFromBottom * treesVisibleFromLeft * treesVisibleFromRight;
            if (scenicScore > highestScenicScore) {
                highestScenicScore = scenicScore;
            }
        }
    }

    return highestScenicScore;
};

const highestScenicScore = processScenicScore(input);
console.log(highestScenicScore);