import { RiRestartLine } from 'react-icons/ri'
import { AiOutlineInfoCircle } from 'react-icons/ai'

interface IProps {
    onInstructions: () => void
    onStart: () => void
}

export default function UtilityButtons({ onInstructions, onStart }: IProps) {
    return (
        <div className='utility-buttons'>
            <button className='restart' onClick={onStart}>
                <RiRestartLine fontSize={'2rem'} />
            </button>
            <button className='instructions' onClick={onInstructions}>
                <AiOutlineInfoCircle fontSize={'2rem'} />
            </button>
        </div>
    )
}
