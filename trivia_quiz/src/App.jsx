import { useState } from 'react'
import './App.css'
import GetQuestion from './GetQuestion.jsx'
import Results from './Results.jsx'

function App() {


  return (
    <>
      <h1 className='main-title' >Hello, World..It's Trivia Time!</h1>
      <hr/>
      <GetQuestion />
      
    </>
  )
}

export default App
