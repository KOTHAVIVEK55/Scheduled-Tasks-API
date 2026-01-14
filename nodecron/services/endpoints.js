const axios = require("axios");
const endpoints = require("../config/endpoints");

async function checkEndpointsHealth(baseURL) {
  const results = [];

  for (const ep of endpoints) {
    const start = Date.now();

    try {
      const response = await axios({
        method: ep.method,
        url: `${baseURL}${ep.path}`,
        timeout: 3000
      });

      results.push({
        name: ep.name,
        status: "UP",
        statusCode: response.status,
        responseTimeMs: Date.now() - start
      });
    } catch (err) {
      results.push({
        name: ep.name,
        status: "DOWN",
        statusCode: err.response?.status || "NO_RESPONSE",
        responseTimeMs: Date.now() - start
      });
    }
  }

  return {
    checkedAt: new Date(),
    endpoints: results
  };
}

module.exports = { checkEndpointsHealth };
