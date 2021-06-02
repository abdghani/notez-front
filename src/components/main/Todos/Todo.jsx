import moment from 'moment'
import React, {useEffect, useContext} from 'react';
import { TodoContext } from '../../../context/TodoContext';


const Todo = ({todos}) => {
    
    const { changeTodo } = useContext(TodoContext)

    return (
        <div className="card mg-t-10">
            <div className="card-content text-left">
                <p className="is-size-4">
                    {moment(todos.date).format('MMM Do YYYY')}
                </p>
                {
                    todos['todos'].map((todo, idx) => (
                        <div className="mg-t-5" key={idx} >
                            <span onClick={e => changeTodo(todo)}>
                                <input 
                                    className="is-checkradio" 
                                    type="checkbox" 
                                    checked={todo.status}
                                    onChange={e => {console.log(e)}}
                                />
                                <label className={`${todo.status ? "done": ""}`} >{todo.content}</label>
                            </span>
                            {
                                todo.status && (
                                    <span>
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                        {moment.unix(todo.updatedAt/1000).fromNow()}
                                    </span>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Todo;