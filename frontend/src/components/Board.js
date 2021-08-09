import './Board.css'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types';
Board.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    onAdvance: PropTypes.func,
    onDelete: PropTypes.func
}


export default function Board({todos, title, onAdvance, onDelete}) {
  return (
    <section className="board">
      <h2>{title}</h2>
      <ul className="board-list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onAdvance={onAdvance}
                onDelete={onDelete}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
