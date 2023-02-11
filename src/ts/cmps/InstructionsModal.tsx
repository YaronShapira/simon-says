import Modal from './Modal'

interface IProps {
    onExitInstructions: () => void
}

export default function InstructionsModal({ onExitInstructions }: IProps) {
    return (
        <Modal>
            <h2>Simon Says!</h2>
            <h4>👋 Introduction</h4>
            <p>Welcome to the Simon says game!</p>
            <h4>🎯 Objectives</h4>
            <p>Repeat the sequence of colors in the correct order.</p>
            <h4>🎮 How to play</h4>
            <p>Watch the sequence of colors, then click on the same colors in the same order.</p>
            <h4>🥇 Scoring</h4>
            <p>Game keeps track of successful rounds. Try to beat your high score.</p>
            <h4>🏆 Good Luck!</h4>
            <p>Have fun!</p>
            <button onClick={onExitInstructions}>Let's Go!</button>
        </Modal>
    )
}
