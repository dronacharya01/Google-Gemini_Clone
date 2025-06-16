import React, { useEffect, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';

const Main = ({
  input,
  setInput,
  askQuestion,
  loading,
  showResult,
  recentPrompt,
  resultData,
  setInputFromCard
}) => {
  const [typingText, setTypingText] = useState('');

  const handleCardClick = (text) => {
  setInput(text);
  if (setInputFromCard) setInputFromCard(text);
  askQuestion(text);  // Pass the prompt directly
};


  useEffect(() => {
    if (!loading && showResult && resultData) {
      setTypingText(''); // Reset text
      let index = 0;

      const interval = setInterval(() => {
        if (index < resultData.length) {
          setTypingText((prev) => prev + resultData.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [loading, showResult, resultData]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user" />
      </div>

      <div className="main-container">
        {loading ? (
          <div className="loading">
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          </div>
        ) : showResult ? (
          <div className="response-container">
            <div className="user-question">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>

            <div className="ai-response visible">
              <img src={assets.gemini_icon} alt="gemini" />
              <pre>{typingText}</pre>
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
  <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat ")}>
    <p>Brainstorm team bonding activities for our work retreat</p>
    <img src={assets.compass_icon} alt="icon" />
  </div>

  <div className="card" onClick={() => handleCardClick("Summarize the latest AI trends in simple terms")}>
    <p>Summarize the latest AI trends in simple terms</p>
    <img src={assets.bulb_icon} alt="icon" />
  </div>

  <div className="card" onClick={() => handleCardClick("Help me write a code")}>
    <p>Help me Write a Code</p>
    <img src={assets.code_icon} alt="icon" />
  </div>

  <div className="card" onClick={() => handleCardClick("What are the top 5 skills to learn in 2025?")}>
    <p>What are the top 5 skills to learn in 2025?</p>
    <img src={assets.message_icon} alt="icon" />
  </div>
</div>

          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  askQuestion();
                  setInput('');
                }
              }}
            />
            <div className="icon-bar">
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <button id='Ask-button'
                onClick={() => {
                  askQuestion();
                  setInput('');
                }}
              >
                <img src={assets.send_icon} alt="send" />
              </button>
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info. Double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
