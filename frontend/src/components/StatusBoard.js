import {Link, useParams} from "react-router-dom";
import TodoItem from "./TodoItem";


export default function StatusBoard ({todos, onAdvance, onDelete}) {

    const {status} = useParams()

    if(todos.length===0){
        return <h1>loading</h1>
    }


    const filteredTodos = todos.filter(todo => todo.status.toLowerCase() === status.toLowerCase())


    if(filteredTodos.length===0){
        return <p>No Todos found</p>
    }

    return (
        <section>
            <h1>{status}</h1>
            {filteredTodos.map(todo => {
                return (
                    <li key={todo.id}>
                        {status==="done" && <TodoItem todo={todo} onDelete={onDelete}  />}
                        {status!=="done" && <TodoItem todo={todo}  onAdvance={onAdvance} />}
                    </li>
                )
            })}
            <Link to="/">
                <button>Back to the roots</button>
            </Link>
        </section>
    )


}