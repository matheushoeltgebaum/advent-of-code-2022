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

const hasOverlap = (firstSection, secondSection) => {
    const isFullyContained = (
        firstSection.min >= secondSection.min &&
        firstSection.max <= secondSection.max
    ) || (
        secondSection.min >= firstSection.min &&
        secondSection.max <= firstSection.max
    );

    const hasIntersection = (
        firstSection.min >= secondSection.min && 
        firstSection.min <= secondSection.max
    ) || (
        firstSection.max >= secondSection.min && 
        firstSection.max <= secondSection.max
    ) || (
        secondSection.min >= firstSection.min && 
        secondSection.min <= firstSection.max
    ) || (
        secondSection.max >= firstSection.min && 
        secondSection.max <= firstSection.max
    );

    return isFullyContained || hasIntersection;
};

const getOverlappingPairs = (elfSectionPairs) => {
    let overlappingPairs = 0;

    for (let i = 0; i < elfSectionPairs.length; i++) {
        let currentSectionPair = elfSectionPairs[i];
        let [firstSection, secondSection] = currentSectionPair.split(',');
        let firstSectionMinMax = getMinMaxFromSection(firstSection);
        let secondSectionMinMax = getMinMaxFromSection(secondSection);

        if (hasOverlap(firstSectionMinMax, secondSectionMinMax)) {
            overlappingPairs++;
        }
    }

    return overlappingPairs;
};

const overlappingPairs = getOverlappingPairs(input);
console.log(overlappingPairs);