import { useEffect, useRef, RefObject, useState } from 'react'
import { utilService } from '../services/util.service'
import { IState as Props } from '../pages/SimonSays'
const SHOW_COLOR_TIME: number = 500
const simonColors: string[] = ['red', 'green', 'yellow', 'blue']

interface IProps {
    gameState: Props['gameState']
    setGameState: React.Dispatch<React.SetStateAction<Props['gameState']>>
    onLose: () => void
}

export default function GameBoard({ gameState, setGameState, onLose }: IProps) {
    const [simonOrder, setSimonOrder] = useState<string[]>([])
    const [userOrder, setUserOrder] = useState<string[]>([])
    const [isUserTurn, setIsUserTurn] = useState<Boolean>(false)

    const gameBoardRef = useRef() as RefObject<HTMLDivElement>

    useEffect(() => {
        if (gameState.isPlaying) {
            newGame()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState.isPlaying])

    useEffect(() => {
        playSimonOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simonOrder])

    useEffect(() => {
        if (!isUserTurn || !userOrder.at(-1)) return

        if (simonOrder[userOrder.length - 1] !== userOrder.at(-1)) {
            return onLose()
        }
        if (userOrder.length === simonOrder.length) {
            nextSimonTurn()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userOrder])

    async function simonTurn() {
        await utilService.wait(SHOW_COLOR_TIME * 2)
        const simonChosenColor = utilService.getRandomItemFromArray(simonColors)

        // this will trigger useEffect which will playSimonOrder()
        setSimonOrder(prev => [...prev, simonChosenColor])
    }

    function newGame() {
        setSimonOrder([])
        setUserOrder([])
        setIsUserTurn(false)
        simonTurn()
    }

    async function nextSimonTurn() {
        setUserOrder([])
        setIsUserTurn(false)
        simonTurn()
        setGameState(prev => ({ ...prev, score: prev.score + 1 }))
    }

    function onSimonButton(ev: React.MouseEvent<HTMLDivElement>) {
        const elTarget = ev.target as HTMLDivElement
        // check if clicked on simon button
        if (![...elTarget.classList].includes('simon-button') || !isUserTurn) return

        const clickedColor: string = elTarget.classList[elTarget.classList.length - 1]
        gameBoardRef.current?.classList.remove('green', 'blue', 'yellow', 'red')
        gameBoardRef.current?.classList.add(clickedColor)
        setTimeout(() => {
            gameBoardRef.current?.classList.remove(clickedColor)
        }, SHOW_COLOR_TIME)

        setUserOrder(prev => [...prev, clickedColor])
    }

    async function playSimonOrder() {
        for (const color of simonOrder) {
            gameBoardRef.current?.classList.add(color)
            await utilService.wait(SHOW_COLOR_TIME)
            gameBoardRef.current?.classList.remove(color)
            await utilService.wait(SHOW_COLOR_TIME - 350)
        }
        setIsUserTurn(true)
    }

    return (
        <div className='game-board' ref={gameBoardRef}>
            <div className='game-board-wrapper' onClick={onSimonButton}>
                <button className='simon-button green'></button>
                <button className='simon-button red'></button>
                <button className='simon-button yellow'></button>
                <button className='simon-button blue'></button>
                <div className='score'>{gameState.score}</div>
            </div>
        </div>
    )
}
