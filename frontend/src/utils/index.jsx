export const getPaierTotal = (paier, items) => {
    // возвращает сумму долга paier за позиции items
    let paierTotal = 0

    items.map((item) => {
        var byOwner = item['payers'].map((e, i) => e === paier['value'] ? i : '').filter(String)
        var byAnyone = item['payers'].map((e, i) => e !== null ? i : '').filter(String)
        var itemCost = item['amount'] * byOwner.length / byAnyone.length
        if (itemCost) paierTotal = paierTotal + itemCost
    })
    return Math.ceil(paierTotal)
}

export const updatePaiersTotals = (paiersList, items) => {
    //обновляет total в paiersList
    let grossTotal = 0

    paiersList.map((payer) => {
      payer['total'] = getPaierTotal(payer, items)
      grossTotal = grossTotal + payer['total']
    })
    return grossTotal
}

export const getPaiersList = (receipt) => {
  let pList = []
  let items = receipt['data']['items']
  items.map((item) => {
    item['payers'].map((p) => {
      if (!pList.find(i => i.value === p)) {
        let payer = {value: p, label: p}
        payer['total'] = getPaierTotal(payer, items)
        pList.push(payer)
      } 
      
    })
  })
  return pList
  
}


export const getKeyByValue = (object, value) => {
    const key = Object.keys(object).find(key => object[key]['value'] === value)
    return key
}

export const range = (start, end, step = 1) => {
    // возвращает числовую последовательность для мэпинга при рендеринге
    const iterate = function* (mapFn) {
      for (let x = start; x <= end; x += step) yield mapFn ? mapFn(x) : x
    }
  
    const rangeObj = {}
    const createProp = v => ({ value: v })
    const map = createProp(mapFn => [...iterate(mapFn)])
  
    Object.defineProperties(rangeObj, {map})
    return rangeObj
  }