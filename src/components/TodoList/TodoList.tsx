import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';
import Filter from '../Filter/Filter';

interface TodoItem {
    id: string;
    text: string;
    status: string;
}

const filters: string[] = ['all', 'active', 'completed'];

const TodoList: React.FC = () => {
const [filter, setFilter] = useState<string>(filters[0]);
const [todos, setTodos] = useState<TodoItem[]>(() => readTodoFromLocalStorage());

const handleAdd = (todo: TodoItem) => setTodos([...todos, todo]);
const handleUpdate = (updated: TodoItem) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
const handleDelete = (deleted: TodoItem) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

const filtered = getFilteredItems(todos, filter);

return (
    <section className={styles.container}>
    <div className={styles.container__inner}>
        <AddTodo onAdd={handleAdd} />
        <div className={styles.list__wrap}>
        <Filter filters={filters} filter={filter} onFilterChange={setFilter} />
        <ul className={styles.list}>
            {filtered.map((item) => (
            <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
        </ul>
        </div>
    </div>
    </section>
);
};

function readTodoFromLocalStorage(): TodoItem[] {
    console.log('readTodoFromLocalStorage');
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos: TodoItem[], filter: string): TodoItem[] {
    if (filter === 'all') {
        return todos;
    }
    return todos.filter((todo) => todo.status === filter);
}

export default TodoList;
