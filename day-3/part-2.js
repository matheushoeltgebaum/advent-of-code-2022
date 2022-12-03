const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-3.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-3.input'), 'utf-8').split('\r\n');

const ITEMS_PRIORITY = {
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26,
    'A': 27,
    'B': 28,
    'C': 29,
    'D': 30,
    'E': 31,
    'F': 32,
    'G': 33,
    'H': 34,
    'I': 35,
    'J': 36,
    'K': 37,
    'L': 38,
    'M': 39,
    'N': 40,
    'O': 41,
    'P': 42,
    'Q': 43,
    'R': 44,
    'S': 45,
    'T': 46,
    'U': 47,
    'V': 48,
    'W': 49,
    'X': 50,
    'Y': 51,
    'Z': 52,
};

const getElfBadgesItems = (rucksacks) => {
    let elfBadges = [];

    for (let i = 0; i < rucksacks.length; i += 3) {
        let firstElfRucksack = rucksacks[i].split('');
        let secondElfRucksack = rucksacks[i + 1].split('');
        let thirdElfRucksack = rucksacks[i + 2].split('');

        let commonItemInRucksacks = firstElfRucksack.filter(item => secondElfRucksack.includes(item) && thirdElfRucksack.includes(item));
        commonItemInRucksacks = [...new Set(commonItemInRucksacks)];
        elfBadges = elfBadges.concat(commonItemInRucksacks);
    }

    return elfBadges;
};

const getItemsPrioritySum = (items) => {
    return items.map(item => {
        return ITEMS_PRIORITY[item];
    }).reduce((acc, value) => {
        return acc + value;
    });
};

const elfBadgesItems = getElfBadgesItems(input);
const sameItemsPrioritySum = getItemsPrioritySum(elfBadgesItems);
console.log(sameItemsPrioritySum);