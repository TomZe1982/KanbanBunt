import './BoardsOverview.css'
import Board from './Board'

export default function BoardsOverview({ todos, onAdvance, onDelete }) {
  const openTodos = todos.filter(todo => todo.status === 'OPEN')
  const inProgressTodos = todos.filter(todo => todo.status === 'IN_PROGRESS')
  const doneTodos = todos.filter(todo => todo.status === 'DONE')

  return (
    <main className="boards-overview">
      <Board title="Todo" todos={openTodos} onAdvance={onAdvance} />
      <Board title="Doing" todos={inProgressTodos} onAdvance={onAdvance} />
      <Board title="Done" todos={doneTodos} onDelete={onDelete} />
    </main>
  )
}
