interface IProps {
    children: JSX.Element[] | JSX.Element
}

export default function Modal({ children }: IProps) {
    return (
        <>
            <div className='dark-overlay'></div>
            <div className='modal'>{children}</div>
        </>
    )
}
