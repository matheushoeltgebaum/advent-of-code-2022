const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-4.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-4.input'), 'utf-8').split('\r\n');

const getMinMaxFromSection = (section) => {
    const [min, max] = section.split('-');

    return {
        min: parseInt(min),
        max: parseInt(max)
    };
};

const getFullyContainedPairs = (elfSectionPairs) => {
    let fullyContainedPairs = 0;

    for (let i = 0; i < elfSectionPairs.length; i++) {
        let currentSectionPair = elfSectionPairs[i];
        let [firstSection, secondSection] = currentSectionPair.split(',');
        let firstSectionMinMax = getMinMaxFromSection(firstSection);
        let secondSectionMinMax = getMinMaxFromSection(secondSection);
        let isFirstSectionContainedInSecondSection = 
            firstSectionMinMax.min >= secondSectionMinMax.min &&
            firstSectionMinMax.max <= secondSectionMinMax.max;
        let isSecondSectionContainedInFirstSection =
            secondSectionMinMax.min >= firstSectionMinMax.min &&
            secondSectionMinMax.max <= firstSectionMinMax.max;

        if (isFirstSectionContainedInSecondSection || isSecondSectionContainedInFirstSection) {
            fullyContainedPairs++;
        }
    }

    return fullyContainedPairs;
};

const fullyContainedPairs = getFullyContainedPairs(input);
console.log(fullyContainedPairs);