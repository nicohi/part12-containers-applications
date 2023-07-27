const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const redis = require('../redis')

const getAdded = async () => {
  let previous = await redis.getAsync('added_todos')
  if (!previous) previous = 0
  return Number(previous)
}

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const added_todos = await getAdded()
  res.send({ added_todos });
});

module.exports = router;
