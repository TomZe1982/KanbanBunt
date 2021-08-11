import './App.css'
import Header from './components/Header'
import BoardsOverview from './components/BoardsOverview'
import NewTodo from './components/NewTodo'
import StatusBoard from './components/StatusBoard'
import {useEffect, useState} from 'react'
import {
    deleteTodo,
    getAllTodos,
    postTodo,
    putTodo,
} from './service/todo-api-service'
import {nextStatus} from './service/todo-service'
import Detail from "./components/Details";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Impressum from "./components/Impressum";


export default function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getAllTodos()
            .then(todos => setTodos(todos))
            .catch(error => console.error(error))
    }, [])

    const createNewTodo = description =>
        postTodo(description)
            .then(() => getAllTodos())
            .then(todos => setTodos(todos))
            .catch(error => console.error(error))

    const advanceTodo = todo => {
        const newTodo = {...todo, status: nextStatus(todo.status)}
        putTodo(newTodo)
            .then(() => getAllTodos())
            .then(todos => setTodos(todos))
            .catch(error => console.error(error))
    }

    const removeTodo = id =>
        deleteTodo(id)
            .then(() => getAllTodos())
            .then(todos => setTodos(todos))
            .catch(error => console.error(error))

    return (
        <Router>
            <div>
                <NavBar/>
            <Switch>
                <Route path="/board/:status">
                    <StatusBoard todos={todos}
                                 onAdvance={advanceTodo}
                                 onDelete={removeTodo}/>
                </Route>

                <Route path="/details/:id">
                    <Detail/>
                </Route>

                <Route path="/impressum">
                    <Impressum/>
                </Route>

                <Route exact path="/">

                    <div className="page-layout">
                        <Header/>
                        <BoardsOverview
                            todos={todos}
                            onAdvance={advanceTodo}
                            onDelete={removeTodo}
                        />
                        <NewTodo onAdd={createNewTodo}/>
                    </div>
                </Route>
            </Switch>
            </div>
        </Router>
    )




}
