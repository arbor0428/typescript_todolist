import React from 'react';
import styles from './Filter.module.css';

interface FilterProps {
    filters: string[];
    filter: string;
    onFilterChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, filter, onFilterChange }) => {
    return (
        <ul className={styles.filters}>
        {filters.map((value, index) => (
            <li key={index}>
            <button
                className={`${styles.filter} ${
                filter === value ? styles.selected : ''
                }`}
                onClick={() => onFilterChange(value)}
            >
                {value}
            </button>
            </li>
        ))}
        </ul>
    );
};

export default Filter;
