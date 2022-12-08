const fs = require('fs'), path = require('path');
//const input = fs.readFileSync(path.join(__dirname, './day-7.test.input'), 'utf-8').split('\r\n');
const input = fs.readFileSync(path.join(__dirname, './day-7.input'), 'utf-8').split('\r\n');

const findCurrentDirectory = (fileSystem, command, directoryPath) => {
    let isMoveToOuterDirectoryCommand = command === '$ cd /';
    let isMoveOutOneLevelCommand = command === '$ cd ..';
    let currentDirectory = {};

    if (isMoveToOuterDirectoryCommand) {
        directoryPath = '/';
        if (!('/' in fileSystem)) {
            fileSystem['/'] = { name: '/', files: [], directories: [] };
        }

        currentDirectory = fileSystem['/'];
    } else if (isMoveOutOneLevelCommand) {
        let directoriesInPath = directoryPath.split('\\');
        directoriesInPath.pop();
        directoryPath = directoriesInPath.join('\\');

        const rootDirectory = fileSystem['/'];
        currentDirectory = rootDirectory;

        for (let i = 1; i < directoriesInPath.length; i++) {
            let dirName = directoriesInPath[i];
            currentDirectory = currentDirectory.directories.find(dir => dir.name === dirName);
        }
    } else {
        let newDirectory = command.replace('$ cd ', '');
        directoryPath += `\\${newDirectory}`;
        let directoriesInPath = directoryPath.split('\\');

        const rootDirectory = fileSystem['/'];
        currentDirectory = rootDirectory;

        for (let i = 1; i < directoriesInPath.length; i++) {
            let dirName = directoriesInPath[i];

            if (!currentDirectory.directories.find(dir => dir.name === dirName)) {
                currentDirectory.directories.push({ name: dirName, files: [], directories: [] });
            }

            currentDirectory = currentDirectory.directories.find(dir => dir.name === dirName);
        }
    }

    return { newDirPath: directoryPath, newCurrentDir: currentDirectory };
};

const getDirectoryContents = (lines, currentIndex) => {
    let currentLine = lines[currentIndex];
    let directories = [];
    let files = [];

    while (currentIndex < lines.length && !currentLine.startsWith('$')) {
        let isDirectory = currentLine.startsWith('dir');
        if (isDirectory) {
            let directoryName = currentLine.replace('dir ', '');
            directories.push({ name: directoryName, files: [], directories: [] });
        } else {
            let [size, name] = currentLine.split(' ');
            files.push({ name, size: parseInt(size) });
        }

        currentIndex++;
        currentLine = input[currentIndex];
    }

    return {
        currentIndex,
        directories,
        files
    };
};

const getFileSystem = (input) => {
    const fileSystem = {};
    let currentDirectory = {};
    let directoryPath = '';

    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i];
        let isChangeDirectoryCommand = currentLine.startsWith('$ cd');        
        let isListDirectoryContentsCommand = currentLine.startsWith('$ ls');

        if (isChangeDirectoryCommand) {
            let { newDirPath, newCurrentDir } = findCurrentDirectory(fileSystem, currentLine, directoryPath);
            directoryPath = newDirPath;
            currentDirectory = newCurrentDir;
        } else if (isListDirectoryContentsCommand) {
            let { currentIndex, directories, files } = getDirectoryContents(input, i + 1);
            currentDirectory.directories = directories;
            currentDirectory.files = files;
            i = currentIndex - 1;
        }
    }

    return fileSystem;
};

const getDirectoriesSizeSum = (directory, currentDirSizeSum) => {
    let currentDirSize = 0;

    for (let i = 0; i < directory.files.length; i++) {
        let file = directory.files[i];
        currentDirSize += file.size;
    }

    for (let i = 0; i < directory.directories.length; i++) {
        let dir = directory.directories[i];
        let { dirSize, newCurrentDirSizeSum } = getDirectoriesSizeSum(dir, currentDirSizeSum);
        currentDirSizeSum = newCurrentDirSizeSum;
        currentDirSize += dirSize;
    }

    if (currentDirSize <= 100000) {
        currentDirSizeSum += currentDirSize;
    }

    return { dirSize: currentDirSize, newCurrentDirSizeSum: currentDirSizeSum };
};

const fileSystem = getFileSystem(input);
const directoriesSizeSum = getDirectoriesSizeSum(fileSystem['/'], 0).newCurrentDirSizeSum;
console.log(directoriesSizeSum);