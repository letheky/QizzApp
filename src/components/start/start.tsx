import './startStyle.scss'
import React from 'react'
import { useState } from 'react'

interface props{
    sendData:Function
}

function Start(props:props) {
    const [showQizz, setShowQizz] = useState(false)

    props.sendData(showQizz)

    return (
        <div className='start'>
            <div className="content">
                <h1>Qizzical</h1>
                <p>This is a qizz app by Le The Ky</p>
                <button className='btn' onClick={() => setShowQizz(!showQizz)}>Let's go</button>
            </div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    )
}

export default Start