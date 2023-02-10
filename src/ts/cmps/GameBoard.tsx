import react, { useEffect, useRef, RefObject } from 'react'

interface IProps {
    isUserTurn: boolean
    simonOrder: string[]
}

export default function GameBoard({ isUserTurn, simonOrder }: IProps) {
    const gameBoardRef = useRef() as RefObject<HTMLDivElement>

    function onSimonButton(ev: React.MouseEvent<HTMLDivElement>) {
        const elTarget = ev.target as HTMLDivElement
        // check if clicked on simon button
        if (![...elTarget.classList].includes('simon-button')) return
        elTarget.classList.add('clicked')
        setTimeout(() => {
            elTarget.classList.remove('clicked')
        }, 1000)
    }

    function wait(time: number) {
        return new Promise((resolve, reject) => setTimeout(resolve, time))
    }

    async function playSimonOrder() {
        for (const color of simonOrder) {
            gameBoardRef.current?.classList.add(color)
            await wait(750)
            gameBoardRef.current?.classList.remove(color)
            await wait(400)
            console.log('WH')
        }
    }

    useEffect(() => {
        if (isUserTurn) return

        playSimonOrder()
    }, [isUserTurn])
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
