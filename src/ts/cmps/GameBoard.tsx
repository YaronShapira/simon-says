import react, { useEffect, useRef, RefObject, useState } from 'react'
import { utilService } from '../services/util.service'

const SHOW_COLOR_TIME: number = 750

// interface IProps {
//     isUserTurn: boolean
//     simonOrder: string[]
// }

export default function GameBoard() {
    const [simonOrder, setSimonOrder] = useState(['red', 'green', 'yellow'])
    const [userOrder, setUserOrder] = useState<string[]>([])
    const [isUserTurn, setIsUserTurn] = useState(false)
    const gameBoardRef = useRef() as RefObject<HTMLDivElement>

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

    function simonTurn(){

    }
    
    useEffect(() => {
        playSimonOrder()
    }, [])

    useEffect(() => {
        console.log(isUserTurn, userOrder)

        if (!isUserTurn || !userOrder.at(-1)) return

        if (simonOrder[userOrder.length - 1] === userOrder.at(-1)) {
            console.log('NICE')
        } else {
            console.log('YOU LOST')
        }
        if (userOrder.length === simonOrder.length){
            simonTurn()
        }
    }, [userOrder])
    return (
        <div className='game-board' ref={gameBoardRef}>
            <div className='game-board-wrapper' onClick={onSimonButton}>
                <div className='simon-button green'></div>
                <div className='simon-button red'></div>
                <div className='simon-button yellow'></div>
                <div className='simon-button blue'></div>
                <div className='score'>9</div>
            </div>
        </div>
    )
}
