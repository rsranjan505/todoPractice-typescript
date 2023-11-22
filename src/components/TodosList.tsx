import React from 'react'
import { useTodos } from '../store/todos'
import { useSearchParams } from 'react-router-dom'

type Props = {}

export default function TodosList({}: Props) {
    const {todos,toggeleTodosAsCompleted,handleDelete } = useTodos();

    const [searchParam] = useSearchParams();
    
    let filteredData = todos;

    let todoUrlData = searchParam.get("todos");

    if(todoUrlData === "active"){
        filteredData = filteredData.filter((task) => !task.completed);
    }

    if(todoUrlData === "completed"){
        filteredData = filteredData.filter((task) => task.completed);
    }

  return (
    <div>
        <ul>
            {
                filteredData.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" className="checkbox" id={`todo-${todo.id}`} 
                        checked={todo.completed} onChange={ () => toggeleTodosAsCompleted(todo.id)} />
                        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                        {
                            todo.completed && (
                                <button type='submit' onClick={() => handleDelete(todo.id)}>Delete</button>
                            )
                        }
                    </li>
                })
            }
        </ul>
    </div>
  )
}