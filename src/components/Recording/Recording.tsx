import UseSpeechAPI from '../../hooks/UseSpeechAPI';


const Recording = () => {
    const {text, 
        startListening, 
        stopListening, 
        isListening, 
        hasRecognitionSupport,
    } = UseSpeechAPI();
    return (
        <div> 
            {hasRecognitionSupport ? (
                <>
                    <div>
                        <button onClick={startListening}>Start isListening</button>
                    </div>

                    {isListening ? <div>Your brower is currently listening</div> : null}
                    {text}
                </>
            ) : (
                <h1>Your browser has no speech recognition support</h1>
            )}
        </div>
    )
    
}

export default Recording;