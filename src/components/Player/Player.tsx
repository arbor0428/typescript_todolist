import React from 'react';
import styles from './Player.module.css';

interface PlayerProps {
    playerNameRef: React.RefObject<HTMLInputElement>;
    readPlayerNameFromLocalStorage: () => string | null;
    savePlayerNameToLocalStorage: (name: string) => void;
    setPlayerName: (name: string) => void;
}

const Player: React.FC<PlayerProps> = ({
        playerNameRef,
        savePlayerNameToLocalStorage,
        setPlayerName,
    }) => {
    const handleClick = () => {
        const name = playerNameRef.current?.value;
        // 로컬 스토리지에 플레이어 이름 저장
        if (name) {
        savePlayerNameToLocalStorage(name);
        setPlayerName(name);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        handleClick();
        }
    };

    return (
        <section className={styles.player}>
        <p className={styles.form}>
            <input
                className={styles.input}
                ref={playerNameRef}
                type="text"
                placeholder="Your Name"
                onKeyPress={handleKeyPress}
            />
            <button className={styles.button} onClick={handleClick}>
                Set Name
            </button>
        </p>
        </section>
    );
};

export default Player;
