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

const processDirectoriesSize = (directory) => {
    let currentDirSize = 0;

    for (let i = 0; i < directory.files.length; i++) {
        let file = directory.files[i];
        currentDirSize += file.size;
    }

    for (let i = 0; i < directory.directories.length; i++) {
        let dir = directory.directories[i];
        let dirSize = processDirectoriesSize(dir);
        currentDirSize += dirSize;
    }

    directory.totalSize = currentDirSize;
    return currentDirSize;
};

const getAmountOfSpaceToDelete = (root) => {
    const freeSpace = 70000000 - root.totalSize;
    return 30000000 - freeSpace;
}

const findSmallestDirectoryToDelete = (directory, amountOfSpace, currentSmallestDir) => {
    for (let i = 0; i < directory.directories.length; i++) {
        let currentDir = directory.directories[i];

        if (currentDir.totalSize >= amountOfSpace && currentDir.totalSize < currentSmallestDir.totalSize) {
            return findSmallestDirectoryToDelete(currentDir, amountOfSpace, currentDir);
        }
    }

    return directory;
};

const fileSystem = getFileSystem(input);
processDirectoriesSize(fileSystem['/']);
const amountOfSpaceToDelete = getAmountOfSpaceToDelete(fileSystem['/']);
const smallestDirectoryToDelete = findSmallestDirectoryToDelete(fileSystem['/'], amountOfSpaceToDelete, fileSystem['/']);
console.log(smallestDirectoryToDelete);