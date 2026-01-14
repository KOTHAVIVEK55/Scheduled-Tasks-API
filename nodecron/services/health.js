const mongoose = require("mongoose");

async function report() {
  const s = mongoose.connection.readyState;
  let status;
  let connectionState;

  switch (s) {
    case 1:
      status = "success";
      connectionState = "connected";
      break;
    case 2:
      status = "failure";
      connectionState = "connecting";
      break;
    case 3:
      status = "failure";
      connectionState = "disconnecting";
      break;
    default:
      status = "failure";
      connectionState = "disconnected";
  }

  return {
    status,
    connectionState,
    checkedAt: new Date()
  };
}

module.exports = { report };
