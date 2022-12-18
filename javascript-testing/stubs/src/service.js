const https = require("https");

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => {
          resolve(JSON.parse(data));
        });
        response.on("error", reject);
      });
    });
  }

  async getPlanets(ulr) {
    const response = await this.makeRequest(ulr)

    return {
      name: response.name,
      sufaceWater: response.surface_water,
      apperedIn: response.films.length
    }
  }
}

module.exports = Service;
