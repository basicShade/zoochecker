const getKeyByValue = (object, value) => {
    const key = Object.keys(object).find(key => object[key]['value'] === value)
    return key
}

export default getKeyByValue