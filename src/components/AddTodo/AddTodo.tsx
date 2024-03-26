import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';

interface Todo {
    id: string;
    text: string;
    status: string;
}

interface AddTodoProps {
    onAdd: (todo: Todo) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [text, setText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim().length === 0) {
        return;
        }
        onAdd({ id: uuidv4(), text, status: 'active' });
        setText('');
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <input
            className={styles.input}
            type="text"
            value={text}
            placeholder="Add Todo"
            onChange={handleChange}
        />
        <button className={styles.button}>Add</button>
        </form>
    );
}

export default AddTodo;
