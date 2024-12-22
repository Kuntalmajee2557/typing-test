import React, { useState } from "react"
import './App.css'

function App() {
  const [quote, setQuote] = useState<string>("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tempora sed pariatur officiis necessitatibus eaque magnam nam, ipsa eum obcaecati? Esse illo libero eligendi eius, incidunt molestias non architecto ipsum?");
  const [inputText, setInputText] = useState<string>("")
  const [mistake, setMistake] = useState<number>(0);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log("e1");
    setInputText(value);

    console.log("e2");

    let quotechars: string[] = quote.split("");
    let inputchars: string[] = value.split("");
    console.log("e3");
    let localMistake = 0;

    inputchars.forEach((char, index) => {
      if(quotechars[index] !== char){
        localMistake++;
      }
    })

    console.log("e4");

    setMistake(localMistake)
    console.log("e5");
  }

  return (
    <div className="container">
      <p className="text">{inputText}</p>
      <p className="text">mistake : {mistake}</p>
      <p className="text">{quote}</p>
      <textarea name="" id="" rows={20} cols={70} onChange={changeHandler}></textarea>
    </div>
  )
}


export default App
