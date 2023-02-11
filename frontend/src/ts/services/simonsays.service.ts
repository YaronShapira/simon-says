import Axios from 'axios'
export const simonSaysService = { get, post }

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL: string = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

async function get() {
    try {
        // const response = await fetch(BASE_URL + 'simon-says', { method: 'GET', credentials: 'include' })
        const response = await axios({
            url: BASE_URL + 'simon-says',
            method: 'get',
        })
        const data = await response.data
        return data
    } catch (err) {
        throw err
    }
}

async function post(highScore: number) {
    try {
        const res = await axios({
            url: BASE_URL + 'simon-says',
            method: 'post',
            data: { score: highScore },
        })
        const data = await res.data
        return data
    } catch (err) {
        throw err
    }
}
