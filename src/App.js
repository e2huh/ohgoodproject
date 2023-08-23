import React, { useState } from 'react';
import './App.css'

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

function ChatGPTApp() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const generateResponse = async () => {
    try {
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };
      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: inputText }],
        temperature: 0.6,
      };

      const response = await fetch(apiUrl,{
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const generatedText = responseData.choices[0].message.content;
      setOutputText(generatedText);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div>
      <header className="title">
        <header className="App-header">언감생心</header>
      </header>
      <hr/>
      <div className ="box">
        <div className="text1">1. 질문 입력하기</div>
        <div className="text2">
              질문을 입력하고 ChatGPT 버튼을 누르면 답변이 출력됩니다.
          </div>
        <textarea id ="question"
          placeholder="질문을 입력하세요."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={generateResponse}id="gptbtn"></button>
      </div>
      <div className="box">
        <div className ="text1">2. ChatGPT :</div>
      <div className = "text2">'분석' 버튼을 누르면 언어 감수성 분석 결과가 출력됩니다.</div>
        <textarea id ="answer" value={outputText} />
        <button id="langbtn">분석</button>
      </div>
      <div className = "result">
        <div className="text1">언어 감수성 분석 결과 </div>
        <div className ="text2"> 유의하세요! 언어 감수성이 낮게 판단될 수 있는 단어입니다.</div>
        <div className="category">- 카테고리 - </div>
        <div className="category1">장애 및 병력
          <div className="category2">성과 가족
            <div className="category3">사회적 신분
              <div className="category4">출신
                <div className="category5">욕설
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <textarea className="resultbox" type="text"/>
    </div>
  );
}

export default ChatGPTApp;
