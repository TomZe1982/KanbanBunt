import './NewTodo.css'
import { useState } from 'react'
import PropTypes from 'prop-types';
NewTodo.propTypes = {
    onAdd: PropTypes.func
}


export default function NewTodo({onAdd}) {
  const [description, setDescription] = useState('')

  const handleAddClick = () => {
    onAdd(description).then(() => setDescription(''))
  }

  return (
    <section className="new-todo">
      <input
        type="text"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button onClick={handleAddClick}>Add</button>
    </section>
  )
}
