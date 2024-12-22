import React, { useEffect, useRef, useState } from "react"
import './App.css'

function App() {
  const [quote, setQuote] = useState<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tempora sed pariatur officiis necessitatibus eaque magnam nam, ipsa eum obcaecati? Esse illo libero eligendi eius, incidunt molestias non architecto ipsum?");
  const [inputText, setInputText] = useState<string>("")
  const [mistake, setMistake] = useState<number>(0);
  const [time, setTime] = useState(30);
  const [startTyping, setStartTyping] = useState(false);
  const [speed, setSpeed] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const words = inputText.split(" ");
    setSpeed(() => {
      return (time === 30 ? 0 : Math.floor((words.length / ((30 - time) / 60))))
    })
  }, [inputText])

  useEffect(() => {
    if (startTyping) {
      let interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        if (textAreaRef.current) {
          textAreaRef.current.disabled = true;
          textAreaRef.current.readOnly = true;
        }
      }, 30 * 1000);
    }
  }, [startTyping])

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTyping) {
      setStartTyping(true);
    }
    const value = e.target.value;
    setInputText(value);
    let quotechars: string[] = quote.split("");
    let inputchars: string[] = value.split("");
    let localMistake = 0;

    inputchars.forEach((char, index) => {
      if (quotechars[index] !== char) {
        localMistake++;
      }
    })
    
    setMistake(localMistake)
  }

  return (
    <div className="container">
      <p className="text">speed : {speed}</p>
      <p className="text">time : {time}</p>
      <p className="text">{inputText}</p>
      <p className="text">mistake : {mistake}</p>
      <p className="text">{quote}</p>
      <textarea name="" id="" rows={20} cols={70} onChange={changeHandler} ref={textAreaRef}></textarea>
    </div>
  )
}


export default App
