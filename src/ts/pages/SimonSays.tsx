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
        getHighScore()
    }, [])

    async function getHighScore() {
        const highScore = await simonSaysService.get()
        setHighScore(highScore)
    }
    async function updateHighScore() {
        const highScore = await simonSaysService.post(gameState.score)
        setHighScore(highScore)
    }

    function onLose() {
        setGameState(prev => ({ ...prev, isPlaying: false, isLost: true }))
        updateHighScore()
    }

    function onStart() {
        setGameState({ score: 0, isLost: false, isPlaying: true })
        setIsInstructionsOpen(false)
    }
    const [highScore, setHighScore] = useState(0)
    const [isInstructionsOpen, setIsInstructionsOpen] = useState(true)
    const [gameState, setGameState] = useState<IState['gameState']>({ isPlaying: false, isLost: false, score: 0 })

    return (
        <div className='simon-says'>
            <p className='high-score'>High Score: {highScore}</p>
            {isInstructionsOpen && <InstructionsModal onStart={onStart} />}
            <GameBoard gameState={gameState} setGameState={setGameState} onLose={onLose} />
            {gameState.isLost && <LostModal score={gameState.score} onStart={onStart} />}
        </div>
    )
}
