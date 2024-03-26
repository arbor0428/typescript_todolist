import React, { useState, useEffect } from 'react';
import styles from './Timer.module.css';

const Timer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    let interval: NodeJS.Timeout;

    useEffect(() => {
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        }

        return () => {
            if (interval !== undefined) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    return (
        <div className={styles.stopwatch}>
            <div className={styles.numbers}>
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={() => setTime(0)}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
