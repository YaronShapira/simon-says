interface IProps {
    score: number
}

export default function LostModal({ score }: IProps) {
    return (
        <>
            <div className='dark-overlay'></div>
            <div className='lost-modal'>
                <h2>You Lost!</h2>
                <p>But hey, your score is {score}</p>
                <button>Play Again</button>
            </div>
        </>
    )
}
