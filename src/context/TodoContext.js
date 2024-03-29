import React, { createContext, useState, useEffect } from 'react';
import { addTodoQuery, fetchTodoQuery, updateTodoQuery } from '../components/gql/todo';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const TodoContext = createContext();
export const TodoContextProvider = (props) => {
    let today = new Date()
    const [ date, setDate ] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0,0,0))
    const { loading: loadingTodos, data: todolist } =  useQuery(fetchTodoQuery)
    const [ rawtodos, setRawTodos ] = useState([]);
    const [ todos, setTodos ] = useState([]);
    const [ addaTodo, { loading: loadingAdd, error: mutationAddError }] = useMutation(addTodoQuery);
    const [ updateTodo, { loading: loadingUpdate, error: mutationUpdateError }] = useMutation(updateTodoQuery);

    const changeTodo = (_todo) => {
        let status;
        let temporaryTodos = [...rawtodos];
        let updateDate = new Date(); 
        temporaryTodos.map(todo => {
            if(_todo.id == todo.id){
                todo.status = !todo.status;
                todo.updatedAt = updateDate;
                status = todo.status;
            }
        })
        setRawTodos(temporaryTodos);
        parseTodos(temporaryTodos);
        updateTodo({
            variables: {
                "id": _todo.id, 
                "status": status, 
                "updatedAt": updateDate
            }
        })
    }

    const addTodo = (_todo) => {
        if (_todo.length){
            addaTodo({
                variables: {"content": _todo,"tdate": date},
                update(_, result){
                    const updatedTodoList =  [...rawtodos, result.data.createTodo];
                    setRawTodos(updatedTodoList);
                    parseTodos(updatedTodoList)
                }
            })
        }
    }

    const parseTodos = (todos) => {
        let todolist = {}
        todos.forEach(todo => {
            if (todolist[todo.createdAt] == undefined){
                todolist[todo.createdAt] = {
                    'date': new Date(parseInt(todo.createdAt,10)),
                    'todos': [todo]
                }
            }else{
                todolist[todo.createdAt]['todos'].push(todo)
            }
        })
        setTodos(todolist)
    }

    useEffect(() => {
        if(todolist != undefined){
            setRawTodos(todolist.fetchTodo)
            parseTodos(todolist.fetchTodo)
        }
    }, [loadingTodos])

    return (
        <TodoContext.Provider value={{
                loadingTodos, 
                todos, 
                addTodo,
                changeTodo
            }}>
            {props.children}
        </TodoContext.Provider>
    )
}
