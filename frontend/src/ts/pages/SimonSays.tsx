import { useState, useEffect } from 'react'
import { simonSaysService } from '../services/simonsays.service'

import GameBoard from '../cmps/GameBoard'
import LostModal from '../cmps/LostModal'
import InstructionsModal from '../cmps/InstructionsModal'
import UtilityButtons from '../cmps/UtilityButtons'

export interface IState {
    gameState: {
        isPlaying: boolean
        isLost: boolean
        score: number
    }
}

export default function SimonSays() {
    const [highScore, setHighScore] = useState<number>(0)
    const [isInstructionsOpen, setIsInstructionsOpen] = useState<Boolean>(true)
    const [gameState, setGameState] = useState<IState['gameState']>({ isPlaying: false, isLost: false, score: 0 })

    useEffect(() => {
        getHighScore()
    }, [])

    async function getHighScore() {
        try {
            const highScore = await simonSaysService.getHighScore()
            setHighScore(highScore)
        } catch (err) {
            console.error('Problem with GETting high score from the server', err)
        }
    }
    async function updateHighScore() {
        try {
            const highScore = await simonSaysService.updateHighScore(gameState.score)
            setHighScore(highScore)
        } catch (err) {
            console.error('Problem with POSTing high score to the server', err)
        }
    }

    function onLose() {
        updateHighScore()
        setGameState(prevGameState => ({ ...prevGameState, isPlaying: false, isLost: true }))
    }

    function onStart() {
        setGameState({ score: 0, isLost: false, isPlaying: true })
    }

    function onExitInstructions() {
        setIsInstructionsOpen(false)
        // if already playing (clicked on info)
        if (gameState.isPlaying) return

        onStart()
    }

    function onInstructions() {
        setIsInstructionsOpen(true)
    }

    async function onRestart() {
        setGameState({ score: 0, isLost: false, isPlaying: true })
    }

    return (
        <div className='simon-says'>
            <p className='high-score'>High Score: {highScore}</p>
            {isInstructionsOpen && <InstructionsModal onExitInstructions={onExitInstructions} />}
            <GameBoard gameState={gameState} setGameState={setGameState} onLose={onLose} />
            {gameState.isLost && <LostModal score={gameState.score} onStart={onStart} />}
            <UtilityButtons onInstructions={onInstructions} onRestart={onRestart} />
        </div>
    )
}
