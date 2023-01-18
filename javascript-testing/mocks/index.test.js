const { rejects, deepStrictEqual } = require("assert");
const { constants } = require("./src/constants");
const { File } = require("./src/file");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        id: 123,
        name: "jose",
        profession: "teste",
        age: 23,
      },
      {
        id: 456,
        name: "carlos",
        profession: "jnkjnvdjvd",
        age: 78,
      },
      {
        id: 789,
        name: "lucas",
        profession: "jnkjnvdjvd",
        age: 25,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
