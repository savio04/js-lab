const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const BASE_URL_1 = "https://swapi.dev/api/planets/1";
const BASE_URL_2 = "https://swapi.dev/api/planets/2";
const mocks = {
  tstopine: require("./mocks/tstooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

(async () => {
  //Vai para internet (forma incorreta)
  // {
  //   const withoutStub = await Service.makeRequest(BASE_URL_2);
  //   console.log(JSON.stringify(withoutStub));
  // }

  //stub tem o objetivo de substituir o resultado de uma função que geralment faz uma request para a internet
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_1).resolves(mocks.tstopine);

  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  // {
  //   const response = await service.makeRequest(BASE_URL_1)
  //   console.log(response)
  // }

  {
    const expected = {
      name: "Tatooine",
      sufaceWater: "1",
      apperedIn: 5,
    };

    const result = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(result, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      sufaceWater: "40",
      apperedIn: 2,
    };

    const result = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(result, expected);
  }
})();
