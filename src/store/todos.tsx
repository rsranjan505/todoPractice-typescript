
import { type } from "os";
import { ReactNode, createContext, useContext, useState } from "react";

export type TodoProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task:string;
    completed:boolean;
    createdAt:Date;
}

export type TodosContext = {
    todos:Todo[];
    handleAddToDo:(task:string) => void;  //call signature
    toggeleTodosAsCompleted:(id:string) => void;  //call signature
    handleDelete:(id:string) => void;  //call signature
}

export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({children}:TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[];
        } catch (error) {
            return [];
        }
    })

    const handleAddToDo = (task:string) => {
        setTodos((prev) => {
            const newTodos:Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            console.log(prev);
            //save in local storage
            localStorage.setItem("todos",JSON.stringify(newTodos) );
            return newTodos;
        })
    }

    //marks as completed 

    const toggeleTodosAsCompleted = (id:string) =>{
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo, completed:!todo.completed}
                }
                return todo;
            })
            localStorage.setItem("todos",JSON.stringify(newTodos) );
            return newTodos;
        })
    }

    const handleDelete = (id:string) => {
        setTodos((prev) => {
            let newTodos = prev.filter((filteredTodo) => filteredTodo.id != id);
            localStorage.setItem("todos",JSON.stringify(newTodos) );
            return newTodos;
        })
    }
    
    return <todosContext.Provider value={{todos, handleAddToDo, toggeleTodosAsCompleted,handleDelete}}>
        {children}
    </todosContext.Provider>
}



//custom hooks
export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if(!todosConsumer){
        throw new Error("useTodos use outside of provider");
    }

    return todosConsumer;

} 