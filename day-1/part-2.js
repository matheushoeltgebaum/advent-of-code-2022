const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-1.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-1.input'), 'utf-8').split('\r\n');

const getCaloriesPerElf = (input) => {
    const calories = [];
    let currentCalories = 0;

    for (let i = 0; i < input.length; i++) {
        let value = input[i];

        if (value) {
            currentCalories += parseInt(value);
        } else {
            calories.push(currentCalories);
            currentCalories = 0;
        }
    }

    if (currentCalories > 0) {
        calories.push(currentCalories);
        currentCalories = 0;
    }

    return calories;
};

const getThreeElvesWithMostCalories = (calories) => {
    return calories.sort((a, b) => { return b - a }).slice(0, 3);
};

const getCaloriesSum = (elvesWithMostCalories) => {
    return elvesWithMostCalories.reduce((acc, value) => {
        return acc + value;
    }, 0);
}

const caloriesPerElf = getCaloriesPerElf(input);
const threeElvesWithMostCalories = getThreeElvesWithMostCalories(caloriesPerElf);
const sumOfCalories = getCaloriesSum(threeElvesWithMostCalories);
console.log(sumOfCalories);