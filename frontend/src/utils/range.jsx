const range = (start, end, step = 1) => {
    const iterate = function* (mapFn) {
      for (let x = start; x <= end; x += step) yield mapFn ? mapFn(x) : x
    }
  
    const rangeObj = {}
    const createProp = v => ({ value: v })
    const map = createProp(mapFn => [...iterate(mapFn)])
  
    Object.defineProperties(rangeObj, {map})
    return rangeObj
  }

export default range

