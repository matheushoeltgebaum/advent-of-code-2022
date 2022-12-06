const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-6.test.input'), 'utf-8');
const input = fs.readFileSync(path.join(__dirname, './day-6.input'), 'utf-8');

const findMarkerPosition = (input) => {
    const buffer = input.split('');
    let markerChars = [];

    for (let i = 0; i < buffer.length; i++) {
        let currentChar = buffer[i];

        if (!markerChars.includes(currentChar)) {
            markerChars.push(currentChar);

            if (markerChars.length === 14) {
                return i + 1;
            }
        } else {
            let charPosition = markerChars.indexOf(currentChar);
            markerChars = markerChars.slice(charPosition + 1);
            markerChars.push(currentChar);
        }
    }
};

const markerPosition = findMarkerPosition(input);
console.log(markerPosition);