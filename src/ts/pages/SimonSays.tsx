import { useState, useEffect } from 'react'
import GameBoard from '../cmps/GameBoard'
import LostModal from '../cmps/LostModal'
import { simonSaysService } from '../services/simonsays.service'

export interface IState {
    gameState: {
        isPlaying: boolean
        isLost: boolean
    }
}

export default function SimonSays() {
    useEffect(() => {
        simonSaysService.get()
    }, [])

    function onLose(score: number) {
        setGameState(prev => ({ ...prev, isLost: true }))
        setScore(score)
        simonSaysService.post(score)
    }
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<IState['gameState']>({ isPlaying: false, isLost: false })

    return (
        <div className='simon-says'>
            <GameBoard gameState={gameState} setGameState={setGameState} onLose={onLose} />
            {gameState.isLost && <LostModal score={score} />}
        </div>
    )
}
