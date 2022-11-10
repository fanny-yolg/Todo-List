import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { user } = useAuthContext()
    
    const [todos, setTodos] = useState(null)
    const [categories, setCategories] = useState(null)
    const [categoryBody, setCategoryBody] = useState("")
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/v1/todo',{
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if(response.ok) {
                setTodos(json["data"])
            }
        }   
        fetchTodos()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/v1/category', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok) {
                setCategories(json["data"])
            }
        }   
        fetchCategories()

    }, [])

    

    const completeTodo = async (id, isComplete) => {
        let isCompleted = isComplete ? false : true;
        const response = await fetch('api/v1/todo/' + id, {
            method: 'PUT',
            body: JSON.stringify({isCompleted}),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        setTodos(todos => todos.map(todo => {
            if(todo._id === json["data"]._id) {
                todo.isCompleted = json["data"].isCompleted;
            }

            return todo
        }))
        
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setCategoryBody({name: event.target.value});
            addCategory(categoryBody);
        }
    };
    
    const addCategory = async (categoryBody) => {
        console.log(categoryBody);
        const response = await fetch('api/v1/category/', {
            method: 'POST',
            body: JSON.stringify(categoryBody),
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        setCategories(categories.push(json));
        console.log("categories");
        console.log(categories);
    }

    return (
        <div className="home">
            <div className="container-categories">
                <p className="category-title">All Tasks</p>

                {categories && categories.map((category) => (
                    <div className="category">
                        <p>{category.name}</p>
                    </div>
                ))}

                <input className="add-category" placeholder="+New Category"
                    onKeyDown={handleKeyDown}
                />
            </div>
           
            <div >
                <hr className="line1"/>
            </div>

            <div className="container-task">
                <h2 className="title-task">All Tasks</h2>
                
                <input className="add-task" placeholder="Add a new task"></input>
                {todos && todos.map((todo) => (
                    <div className="inline" >
                        <div className={"checkbox-todo" + (todo.isCompleted ? " is-checked" : "")} type="checkbox" 
                        onClick={() => completeTodo(todo._id, todo.isCompleted)}
                        ></div>
                        <p className={"title-todo" + (todo.isCompleted ? " is-complete" : "")}>{todo.title}</p>
                        <div className="rectangle-todo">
                            <p className="category-todo">{todo.categoryId.name}</p>
                        </div> 
                    </div> 
                ))}
            </div>
        </div>
    )
}
export default Home