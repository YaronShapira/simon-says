import { useState } from 'react'
import GameBoard from '../cmps/GameBoard'
import LostModal from '../cmps/LostModal'

export interface IState {
    gameState: {
        isPlaying: boolean
        isLost: boolean
    }
}

export default function SimonSays() {
    const [gameState, setGameState] = useState<IState['gameState']>({ isPlaying: false, isLost: false })

    return (
        <div className='simon-says'>
            <GameBoard gameState={gameState} setGameState={setGameState}/>
            {gameState.isLost && <LostModal />}
        </div>
    )
}
