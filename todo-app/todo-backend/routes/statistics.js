const express = require("express");
const { getAsync } = require("../redis/index");
const router = express.Router();

/* GET statistics. */
router.get("/", async (_, res) => {
  const added_todos = await getAsync("added_todos");
  res.send({ added_todos: added_todos });
});

module.exports = router;
