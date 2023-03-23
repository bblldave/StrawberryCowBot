const { initClient } = require("./clientManager");
const keepAlive = require("./server");

keepAlive();
initClient();
