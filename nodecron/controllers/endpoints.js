const { checkEndpointsHealth } = require("../services/endpoints");

async function getEndpointsHealth(req, res) {
  const baseURL = `${req.protocol}://${req.get("host")}`;
  const health = await checkEndpointsHealth(baseURL);
  res.status(200).json(health);
}

module.exports = { getEndpointsHealth };
