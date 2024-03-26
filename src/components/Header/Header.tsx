import React, { useState, useRef, useEffect } from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import styles from './Header.module.css';
import { HiMoon, HiSun } from 'react-icons/hi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Player from '../Player/Player';


export default function Header() {
    const playerNameRef = useRef<HTMLInputElement>(null);

    const { darkMode, toggleDarkMode } = useDarkMode();
    const [startDate, setStartDate] = useState<Date>(new Date());

    const [playerName, setPlayerName] = useState<string>('');

    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 플레이어 이름 읽어오기
        const savedPlayerName = readPlayerNameFromLocalStorage();
        if (savedPlayerName) {
        setPlayerName(savedPlayerName);
        }
    }, []);

    // 로컬 스토리지에서 플레이어 이름 읽어오는 함수
    function readPlayerNameFromLocalStorage(): string | null {
        // 'playerName' 키를 사용하여 데이터를 읽어옵니다.
        const savedPlayerName = localStorage.getItem('playerName');
        return savedPlayerName;
    }

    // 로컬 스토리지에 플레이어 이름 저장하는 함수
    function savePlayerNameToLocalStorage(name: string): void {
        // 'playerName' 키를 사용하여 데이터를 저장합니다.
        localStorage.setItem('playerName', name);
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.calendar}>
                    <p>Date :</p>
                    <DatePicker
                        className={styles.datePicker}
                        selected={new Date(startDate)}
                        dateFormat="yyyy.MM.dd"
                        onChange={(date: Date) => setStartDate(date)}
                        
                    />
                </div>
                <div className={styles.header__right}>
                    <Player
                        playerNameRef={playerNameRef}
                        readPlayerNameFromLocalStorage={readPlayerNameFromLocalStorage}
                        savePlayerNameToLocalStorage={savePlayerNameToLocalStorage}
                        setPlayerName={setPlayerName}
                    />
                    <button className={styles.toggle} onClick={toggleDarkMode}>
                        {!darkMode && <HiMoon />}
                        {darkMode && <HiSun />}
                    </button>
                </div>
            </header>
            <h2>Welcome {playerName ? playerName : 'unknown entity'}!</h2>
        </>
    );
}
