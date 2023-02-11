interface IProps {
    score: number
    onStart: () => void
}

export default function LostModal({ score, onStart }: IProps) {
    return (
        <>
            <div className='dark-overlay'></div>
            <div className='lost-modal'>
                <h2>You Lost!</h2>
                <p>But hey, your score is {score}</p>
                <button onClick={onStart}>Play Again</button>
            </div>
        </>
    )
}
