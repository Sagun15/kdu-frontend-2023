const path = require("path");

// 2. a)
const extractFileInfo = (filePath) => {
  const properties = {
    extension: path.extname(filePath),
    baseName: path.basename(filePath),
    directory: path.dirname(filePath),
  };
  return properties;
};

console.log("2a:");
console.log(extractFileInfo("/home/dell/file.json"));

// 2. b)
const processFilePaths = (filePathsArray) => {
  const propertiesArray = [];
  filePathsArray.forEach(filePath => {
    propertiesArray.push(extractFileInfo(filePath));
  }); 
  return propertiesArray;
};

const filePaths = [
  "dir1/dir2/file1.txt",
  "dir1/dir3/file2.txt",
  "dir1/dir3/file3.md",
  "dir4/file4.jpg",
  "dir4/file5.pdf",
];

console.log("\n\n2b:");
console.log(processFilePaths(filePaths));
