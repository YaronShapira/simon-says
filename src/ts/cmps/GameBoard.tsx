import { useEffect, useRef, RefObject, useState } from 'react'
import { utilService } from '../services/util.service'
import { IState as Props } from '../pages/SimonSays'
const SHOW_COLOR_TIME: number = 750

interface IProps {
    gameState: Props['gameState']
    setGameState: React.Dispatch<React.SetStateAction<Props['gameState']>>
}

export default function GameBoard({ gameState, setGameState }: IProps) {
    const [simonOrder, setSimonOrder] = useState<string[]>([])
    const [userOrder, setUserOrder] = useState<string[]>([])
    const [isUserTurn, setIsUserTurn] = useState(false)
    const gameBoardRef = useRef() as RefObject<HTMLDivElement>

    const simonColors = ['red', 'green', 'yellow', 'blue']

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

    async function simonTurn() {
        await utilService.wait(SHOW_COLOR_TIME * 2)
        const simonChosenColor = utilService.getRandomItemFromArray(simonColors)
        setSimonOrder(prev => [...prev, simonChosenColor])
    }

    useEffect(() => {
        
    }, [gameState.isPlaying])

    useEffect(() => {
        playSimonOrder()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simonOrder])

    useEffect(() => {
        if (!isUserTurn || !userOrder.at(-1)) return

        if (simonOrder[userOrder.length - 1] !== userOrder.at(-1)) {
            // setGameState(prev => ({ ...prev, isLost: true }))
            return
        }
        if (userOrder.length === simonOrder.length) {
            setUserOrder([])
            setIsUserTurn(false)
            simonTurn()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userOrder])
    return (
        <div className='game-board' ref={gameBoardRef}>
            <div className='game-board-wrapper' onClick={onSimonButton}>
                <button className='simon-button green'></button>
                <button className='simon-button red'></button>
                <button className='simon-button yellow'></button>
                <button className='simon-button blue'></button>
                <div className='score'>{simonOrder.length - 1}</div>
            </div>
        </div>
    )
}
