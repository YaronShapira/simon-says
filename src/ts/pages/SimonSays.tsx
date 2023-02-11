import { useState, useEffect } from 'react'
import GameBoard from '../cmps/GameBoard'
import LostModal from '../cmps/LostModal'
import { simonSaysService } from '../services/simonsays.service'
import InstructionsModal from '../cmps/InstructionsModal'

export interface IState {
    gameState: {
        isPlaying: boolean
        isLost: boolean
        score: number
    }
}

export default function SimonSays() {
    useEffect(() => {
        simonSaysService.get()
    }, [])

    function onLose() {
        setGameState(prev => ({ ...prev, isPlaying: false, isLost: true }))
        simonSaysService.post(gameState.score)
    }

    function onStart() {
        setGameState(prev => ({ ...prev, isLost: false, isPlaying: true }))
        setIsInstructionsOpen(false)
    }
    const [isInstructionsOpen, setIsInstructionsOpen] = useState(true)
    const [gameState, setGameState] = useState<IState['gameState']>({ isPlaying: false, isLost: false, score: 0 })

    return (
        <div className='simon-says'>
            <p className='high-score'>High Score: 0</p>
            {isInstructionsOpen && <InstructionsModal onStart={onStart} />}
            <GameBoard gameState={gameState} setGameState={setGameState} onLose={onLose} />
            {gameState.isLost && <LostModal score={gameState.score} onStart={onStart} />}
        </div>
    )
}
