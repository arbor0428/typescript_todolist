import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Todo.module.css';

interface TodoProps {
    todo: {
        id: string;
        text: string;
        status: string;
    };
    onUpdate: (updated: { id: string; text: string; status: string }) => void;
    onDelete: (deleted: { id: string; text: string; status: string }) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onUpdate, onDelete }) => {
    const { id, text, status } = todo;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.checked ? 'completed' : 'active';
        onUpdate({ ...todo, status });
    };

    const handleDelete = () => onDelete(todo);

    return (
        <li className={styles.todo}>
        <input
            className={styles.checkbox}
            type="checkbox"
            id={id}
            checked={status === 'completed'}
            onChange={handleChange}
        />
        <label className={styles.text} htmlFor={id}>
            {text}
        </label>
        <span className={styles.icon}>
            <button className={styles.button} onClick={handleDelete}>
            <FaTrashAlt />
            </button>
        </span>
        </li>
    );
};

export default Todo;
