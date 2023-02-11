import Axios from 'axios'
export const simonSaysService = { getHighScore, updateHighScore }

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL: string = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

async function getHighScore() {
    try {
        const res = await axios({
            url: BASE_URL + 'simon-says',
            method: 'get',
        })
        return res.data
    } catch (err) {
        throw err
    }
}

async function updateHighScore(highScore: number) {
    try {
        const res = await axios({
            url: BASE_URL + 'simon-says',
            method: 'post',
            data: { score: highScore },
        })
        return res.data
    } catch (err) {
        throw err
    }
}
