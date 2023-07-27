import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from './Todo'

test('todo displays text', async () => {
  const todo = { text: "test", done: false }

  render(<Todo todo={todo} />)

  expect(screen.queryByText('test')).toBeDefined()
})
