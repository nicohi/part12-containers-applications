const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

const getAdded = async () => {
  let previous = await redis.getAsync('added_todos')
  if (!previous) previous = 0
  return Number(previous)
}

const incrAdded = async () => {
  let previous = await getAdded()
  await redis.setAsync('added_todos', previous+1)
}

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await incrAdded()
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  //res.sendStatus(405); // Implement this
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  //res.sendStatus(405); // Implement this
  const { _id, ...newtodo } = req.body;
  _id;
  const todo = await Todo.findOneAndUpdate({ _id: req.todo._id }, newtodo, {new:true});
  res.send(todo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
