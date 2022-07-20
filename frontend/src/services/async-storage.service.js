export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        return entities.find(entity => entity._id === entityId)
    } catch (err) {
        console.error('async-strorage couldnt get entity')
        throw (err)
    }
}

async function post(entityType, newEntity) {
    try {
        newEntity = JSON.parse(JSON.stringify(newEntity))
        newEntity._id = _makeId()
        const entities = await query(entityType)
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (err) {
        console.error('async-strorage couldnt add entity')
        throw (err)
    }
}

async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (err) {
        console.error('async-strorage couldnt update entity')
        throw (err)
    }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (err) {
        console.error('async-strorage couldnt remove entity')
        throw (err)
    }
}

// function postMany(entityType, newEntities) {
//     const entities = await query(entityType)
//         .then(entities => {
//             newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
//             entities.push(...newEntities)
//             _save(entityType, entities)
//             return entities
//         })
// }


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


