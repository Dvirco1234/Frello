export const applyDrag = (arr, dragResult) => {
  console.log('dragResult', dragResult);
    const { removedIndex, addedIndex, payload } = dragResult//.dropResult
    if (removedIndex === null && addedIndex === null) return arr
  
    const result = [...arr]
    let itemToAdd = payload
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]
      console.log('removedIndex', removedIndex);
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd)
    }
    console.log('result:', result)
    return result
  }
  
  export const generateItems = (count, creator) => {
    const result = []
    for (let i = 0; i < count; i++) {
      result.push(creator(i))
    }
    return result
  }