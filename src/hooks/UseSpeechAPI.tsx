import React, { useEffect, useState } from 'react';

let recongnition: any = null;

if("webkitSpeechRecognition" in window) {
    recongnition = new webkitSpeechRecognition();
    recongnition.continuous = true;
    recongnition.lang = "ko-KR"

}

const UseSpeechAPI = () => {
    const [spokenText, setSpokenText] = useState<string>('');
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (!recongnition) return;

        recongnition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event : ', event);
            setSpokenText(event.results[0][0].transcript)
            recongnition.stop();
            setListening(false);
        }
    }, []);

    const startListening = () => {
        setSpokenText('')
        setListening(true);
        recongnition.start();
    }

    const stopListening = () => {
        setListening(false);
        recongnition.stop();
    }

    return {
        spokenText,
        setSpokenText,
        listening,
        startListening,
        stopListening,
        hasRecognitionSupport: !! recongnition,
    }
}


export default UseSpeechAPI;