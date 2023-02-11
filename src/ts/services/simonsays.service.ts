import Axios from 'axios'
export const simonSaysService = { get, post }

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL: string = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

async function get() {
    const response = await fetch(BASE_URL + 'simon-says', { method: 'GET', credentials: 'include' })
    const data = await response.json()
    console.log(data)
}

async function post(highScore: number) {
    const res = await axios({
        url: BASE_URL + 'simon-says',
        method: 'post',
        data: { score: highScore },
    })
    const data = await res.data
    console.log(data)
}
