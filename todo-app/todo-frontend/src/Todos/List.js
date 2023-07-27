import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, ...props}) => {

  return (
    <>
      {todos.map(todo => <Todo todo={todo} { ...props } />).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
