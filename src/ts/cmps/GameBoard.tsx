export default function GameBoard() {
    function onSimonButton(ev: React.MouseEvent<HTMLDivElement>) {
        const elTarget = ev.target as HTMLDivElement
        // check if clicked on simon button
        if (![...elTarget.classList].includes('simon-button')) return
        elTarget.classList.add('clicked')
        setTimeout(() => {
            elTarget.classList.remove('clicked')
        }, 1000)
    }
    return (
        <div className='game-board'>
            <div className='game-board-wrapper' onClick={onSimonButton}>
                <div className='simon-button simon-1'></div>
                <div className='simon-button simon-2'></div>
                <div className='simon-button simon-3'></div>
                <div className='simon-button simon-4'></div>
                <div className='score'>9</div>
            </div>
        </div>
    )
}
