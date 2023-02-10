export const utilService = {
    wait,
    getRandomItemFromArray,
}

function wait(time: number) {
    return new Promise((resolve, reject) => setTimeout(resolve, time))
}

function getRandomItemFromArray(array: any[]) {
    return array[Math.floor(Math.random() * array.length)]
}
