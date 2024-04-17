import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddTodo.module.css';
import UseSpeechAPI from '../../hooks/UseSpeechAPI';
import recordIcon from '../../assets/img/record.png';
import stopIcon from '../../assets/img/stop.png';

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
    const [isListeningVisible, setIsListeningVisible] = useState(true);

    const { spokenText, setSpokenText, listening, startListening, stopListening } = UseSpeechAPI();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            return;
        }
        onAdd({ id: uuidv4(), text, status: 'active' });
        setText('');
    };

    const handleSpeechAdd = () => {
        if (spokenText && spokenText.trim().length > 0) {
            onAdd({ id: uuidv4(), text: spokenText, status: 'active' });
            stopListening();
            setSpokenText(''); 
        }
    };

    const handleStartListening = () => {
        startListening();
        setIsListeningVisible(false);
    };

    return (
        <form className={`${isListeningVisible ? styles.isListeningForm : styles.form}`} onSubmit={handleSubmit}>
            <div className={`${isListeningVisible ? styles.isListeningTyping : styles.typing}`}>
                <input
                    className={styles.input}
                    type="text"
                    value={text}
                    placeholder="Add Todo"
                    onChange={handleChange}
                />
                <button className={styles.button}>Add</button>
            </div>

            <div className={`${isListeningVisible ? styles.isListeningSpeeching : styles.speeching}`}>
                {!isListeningVisible && (
                    <div className={styles.spoketext}>Spoke Text : {spokenText}</div>
                )}
                {listening ? ( 
                    <button className={styles.voicebutton} onClick={stopListening}><img src={stopIcon} alt="STOP" /></button>
                    ) : (
                    <button className={styles.voicebutton} onClick={handleStartListening}><img src={recordIcon} alt="RECORD" /></button> 
                )}
                {!isListeningVisible && (
                    <button className={styles.speechAddbutton} onClick={handleSpeechAdd}>Add</button>
                )}
            </div>
        </form>
    );
};

export default AddTodo;
