import PropTypes from 'prop-types';
import './TodoItem.css'
import styled from "styled-components/macro";
import { Link} from "react-router-dom";

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onAdvance: PropTypes.func,
    onDelete: PropTypes.func,
}

export default function TodoItem({todo, onAdvance, onDelete}) {

    return (

            <TodoItemStyle>
                <section>
                    <h3>{todo.description}</h3>
                    <TodoButtonStyle>
                        <section>

                            <Link to={"/details/"+todo.id}><ButtonStyleDetails >Details</ButtonStyleDetails></Link>

                            {onAdvance && <ButtonStyle advanced onClick={() => onAdvance(todo)}>Advance</ButtonStyle>}
                            {onDelete && <ButtonStyle delete onClick={() => onDelete(todo.id)}>Delete</ButtonStyle>}
                        </section>
                    </TodoButtonStyle>
                </section>
            </TodoItemStyle>



    )





}

const TodoItemStyle = styled.section`
    border: 1px solid #333;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 1px 2px 8px #666;
    background-color: coral`;

const TodoButtonStyle = styled.section`
   display: flex;
    justify-content: flex-end;
`

const ButtonStyle = styled.button`
${props => props.advanced ? 'background-color: lightcoral;' : ''}
${props => props.delete ? 'background-color: lightblue;' : ''}
`

const ButtonStyleDetails = styled.button`
    background: aquamarine;
  box-shadow: blue;
  `