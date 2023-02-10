export default function LostModal() {
    return (
        <>
            <div className='dark-overlay'></div>
            <div className='lost-modal'>
                <h2>You Lost!</h2>
                <p>But hey, your score is 7</p>
                <button>Play Again</button>
            </div>
        </>
    )
}
