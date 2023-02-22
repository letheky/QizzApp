import './App.css'
import Start from './components/start/start'
import Qizz from './components/Qizz/qizz'
import { useState } from 'react'

function App() {

  const [showQizz, setShowQizz] = useState(false)

  function getDatafromChild(val:boolean){
    setShowQizz(val);
  }
  
  return (
    <div className="App">
      {!showQizz && <Start sendData={getDatafromChild}/>}
      {showQizz && <Qizz />}
    </div>
  )
}

export default App
