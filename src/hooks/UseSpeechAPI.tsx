"use client"

import React, { useEffect, useState } from 'react';

let recongnition: any = null;

if("webkitSpeechRecognition" in window) {
    recongnition = new webkitSpeechRecognition();
    recongnition.continuous = true;
    recongnition.lang = "ko-KR"

}

const UseSpeechAPI = () => {
    const [text, setText] = useState<string>();
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recongnition) return;

        recongnition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event : ', event);
            setText(event.results[0][0].transcript)
            recongnition.stop();
            setIsListening(false);
        }
    }, []);

    const startListening = () => {
        setText('')
        setIsListening(true);
        recongnition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recongnition.stop();
    }



    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !! recongnition,
    }
}

export default UseSpeechAPI;

