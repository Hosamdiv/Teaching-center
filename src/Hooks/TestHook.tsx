import { useState } from "react";

interface IArray {
    id: number; text: string;
}
const todosList: IArray[] = [{ id: 0, text: "" }]
const TestHook = () => {
    const [todoList, setTodoList] = useState({
        name: "",
        todolist: ""
    })
    const [nextId, setNextId] = useState(1);
    const [todos, setTodos] = useState(todosList);

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setTodoList({
            ...todoList,
            [name]: value
        })
    }
    const addTodo = () => {
        const newId = nextId + 1;
        setNextId(newId);
        setTodos((prev) => [...prev, { id: newId, text: "todo #" + nextId }])
        setTodoList({
            name: "",
            todolist: "hosam"
        })
    }
    console.log(todoList);

    return (
        <div>
            <button
                className="border px-3 py-2 rounded"
                onClick={addTodo}>Add</button>
            <input className="border rounded px-3 py-2 ml-2"
                type="text"
                placeholder="Todo List"
                name="todolist"
                value={todoList.todolist}
                onChange={handelChange}
            />
            <h1>{todoList.todolist.trim() === "hosam" ? todoList.todolist : null}</h1>
            <ul>
                {todos.map((t, i) => (
                    <li key={i}>{t.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default TestHook




