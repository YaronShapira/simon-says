import { RiRestartLine } from 'react-icons/ri'
import { AiOutlineInfoCircle } from 'react-icons/ai'

interface IProps {
    onInstructions: () => void
    onRestart: () => void
}

export default function UtilityButtons({ onInstructions, onRestart }: IProps) {
    return (
        <div className='utility-buttons'>
            <button className='restart' onClick={onRestart}>
                <RiRestartLine fontSize={'2rem'} />
            </button>
            <button className='instructions' onClick={onInstructions}>
                <AiOutlineInfoCircle fontSize={'2rem'} />
            </button>
        </div>
    )
}
