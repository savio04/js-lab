const { readFileSync } = require("fs");
const { join } = require("path");
const { constants } = require("./constants");
const User = require("./user");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const csv = File.getFileContent(filePath);
    const result = File.isValid(csv);

    if (result.error) {
      throw new Error(result.error);
    }

    const json = File.parseCsvToJson(csv);

    return json;
  }

  static getFileContent(filePath) {
    //normilize path
    // const filename = join(__dirname, filePath);
    return readFileSync(filePath, { encoding: "utf-8" });
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...lines] = csvString.split("\n");

    const isHeadeValid = header === options.fields.join(",");

    if (!isHeadeValid) {
      return {
        error: constants.error.FILE_FIELDS_ERROR_MESSAGE,
      };
    }

    const isContenteLengtAccpted =
      lines.length > 1 && lines.length <= options.maxLines;

    if (!isContenteLengtAccpted) {
      return {
        error: constants.error.FILE_LENGTH_ERROR_MESSAGE,
      };
    }

    return {
      valid: true,
    };
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split("\n");
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const mapped = lines.map((line) => {
      const columns = line.split(",");
      const user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }

      return new User(user);
    });

    return mapped;
  }
}

// (async () => {
//   try {
//     // const result = await File.csvToJson("../mocks/invalid-header.csv");
//     const result = await File.csvToJson("../mocks/fourItems-invalid.csv");
//     // const result = await File.csvToJson("../mocks/fourItems-invalid.csv");

//     console.log({
//       result,
//     });
//   } catch (error) {
//     console.log({
//       error,
//     });
//   }
// })();

module.exports = { File };
