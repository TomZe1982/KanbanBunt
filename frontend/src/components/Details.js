import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTodo} from "../service/todo-api-service";
import styled from "styled-components/macro";


export default function Detail() {

    const {id} = useParams();

    const [todo, setTodo] = useState('')

    useEffect(() => {
        getTodo(id)
            .then(reachedTodo => setTodo(reachedTodo))
            .catch(error => console.error(error))
    }, [id])


    return (
        <div>
            <h1>ID, die niemanden interessiert : {todo.id}</h1>
            <h1>Name : {todo.description}</h1>
            <h1>Status : {todo.status}</h1>
            <Link to="/"><ButtonStyle >Home</ButtonStyle></Link>

        </div>
    )

}

const ButtonStyle = styled.button`
    background: aquamarine;
  `
