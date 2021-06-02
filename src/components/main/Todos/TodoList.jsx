import React, { useState, useContext, useEffect } from 'react';
import Todo from './Todo';
import { TodoContext } from '../../../context/TodoContext'
import Loading from '../../shared/Loading';

const TodoList = () => {
    const [ newTodo, setNewTodo ] = useState('');
    const { loadingTodos, todos, addTodo } = useContext(TodoContext)
    const setTodoField = (e) => {
        if (e.key === 'Enter') {
            addTodo(newTodo);
            setNewTodo('');
        }
    }

    return (
        <div className="is-fluid">
            <div className="mg-t-10">
                <div className="field">
                    <div className="control">
                        <input 
                            value={newTodo}
                            className="input is-primary" 
                            type="text" 
                            placeholder="Add a todo" 
                            onKeyDown={(e) => setTodoField(e)}
                            onChange={e => setNewTodo(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {
                loadingTodos ? (<Loading /> ) : Object.keys(todos).sort().reverse().map((tododate, idx) => (
                    <Todo todos={todos[tododate]} key={idx}/>
                ))  
            }     
        </div>
    )

}

export default TodoList;