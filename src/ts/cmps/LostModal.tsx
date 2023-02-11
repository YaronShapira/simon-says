import Modal from './Modal'

interface IProps {
    score: number
    onStart: () => void
}

export default function LostModal({ score, onStart }: IProps) {
    return (
        <Modal>
            <h2>You Lost!</h2>
            <p>But hey, your score is {score}</p>
            <button onClick={onStart}>Play Again</button>
        </Modal>
    )
}
