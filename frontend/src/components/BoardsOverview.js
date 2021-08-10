import './BoardsOverview.css'
import Board from './Board'
import PropTypes from 'prop-types';
import styled from "styled-components/macro";

BoardsOverview.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAdvance: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default function BoardsOverview({todos, onAdvance, onDelete}) {
    const openTodos = todos.filter(todo => todo.status === 'OPEN')
    const inProgressTodos = todos.filter(todo => todo.status === 'IN_PROGRESS')
    const doneTodos = todos.filter(todo => todo.status === 'DONE')

    return (
        <BoardStyle>
            <BoardTodo open todos={openTodos}>
                <Board title="Todo" todos={openTodos} onAdvance={onAdvance}/>
            </BoardTodo>
            <BoardTodo doing todos={inProgressTodos}>
                <Board title="Doing" todos={inProgressTodos} onAdvance={onAdvance}/>
            </BoardTodo>
            <BoardTodo done todos={doneTodos}>
                <Board title="Done" todos={doneTodos} onDelete={onDelete}/>
            </BoardTodo>
        </BoardStyle>
    )
}

    const BoardStyle = styled.main`
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
    padding: 0 12px;
    `
    const BoardTodo = styled.div`
    ${props => props.open && props.todos.length > 0 ? `background-color: yellow` : ``}
    ${props => props.doing && props.todos.length > 0 ? `background-color: blue` : ``}
    ${props => props.done && props.todos.length > 0 ? `background-color: green` : ``}
   `
