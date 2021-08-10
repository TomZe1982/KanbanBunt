import './Board.css'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

Board.propTypes = {
  title: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdvance: PropTypes.func,
  onDelete: PropTypes.func,
}

export default function Board({ title, todos, onAdvance, onDelete }) {

  return (
    <section className="board">
      <h2>{title}</h2>
      <ul className="board-list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <TodoItem todo={todo} onAdvance={onAdvance} onDelete={onDelete} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
