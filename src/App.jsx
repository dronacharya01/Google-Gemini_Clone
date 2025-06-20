import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { URL } from './config/gemini';

const App = () => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const askQuestion = async (customPrompt) => {
    const question = (customPrompt || input).trim();
    if (!question) return;

    setLoading(true);
    setShowResult(false);
    setRecentPrompt(question);

    const hiddenInstruction = " (Respond in under 500 words.)";

    const payload = {
      contents: [
        {
          parts: [
            {
              text: question + hiddenInstruction,
            }
          ]
        }
      ]
    };

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Save prompt-response to history
      setPrevPrompts(prev => [...prev, { prompt: question, response: answer }]);
      setResultData(answer);
      setShowResult(true);
    } catch (error) {
      setResultData("❌ Something went wrong");
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setPrevPrompts([]);
    setRecentPrompt("");
    setResultData("");
    setShowResult(false);
    setInput("");
  };

  const setInputFromCard = (text) => {
    setInput(text);
    askQuestion(text); // 🔥 triggers correct question immediately
  };

  return (
    <>
      <Sidebar
        prevPrompts={prevPrompts}
        onClear={clearChat}
        onSelectPrompt={setInputFromCard}
      />
      <Main
        input={input}
        setInput={setInput}
        askQuestion={askQuestion}
        loading={loading}
        showResult={showResult}
        recentPrompt={recentPrompt}
        resultData={resultData}
        setShowResult={setShowResult}
        setResultData={setResultData}
        setRecentPrompt={setRecentPrompt}
        setInputFromCard={setInputFromCard}
      />
    </>
  );
};

export default App;
