import React, { useState } from 'react'
import GameBoard from '../cmps/GameBoard'

export default function SimonSays() {
    const [simonOrder, setSimonOrder] = useState(['red', 'green', 'yellow'])
    const [isUserTurn, setIsUserTurn] = useState(false)

    return (
        <div className='simon-says'>
            <GameBoard isUserTurn={isUserTurn} simonOrder={simonOrder} />
        </div>
    )
}
