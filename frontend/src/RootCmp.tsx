import './assets/style/main.scss'
import Copyright from './ts/cmps/Copyright'
import SimonSays from './ts/pages/SimonSays'

export default function App() {
    return (
        <main className='app'>
            <SimonSays />
            <Copyright />
        </main>
    )
}
