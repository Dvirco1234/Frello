import { httpService } from './http-service'
import { storageService } from './async-storage.service'

const BOARDS_KEY = 'boardsDB'
const gCurrrBoard = null

export const boardService = {
    query,
    getById,
    getEmptyTask,
    save,
    remove,
}

function query(filter = { txt: '', condition: 'all', page: 1 }) {
    return storageService.query(BOARDS_KEY).then(tasks => {
        const regex = new RegExp(filter.txt, 'i')
        let filteredTask
        if (filter.condition === 'all') filteredTask = tasks.filter(task => regex.test(task.txt))
        else filteredTask = tasks.filter(task => regex.test(task.txt))
        return Promise.resolve(filteredTask)
    })
    // return await httpService.get('board', { params: filterBy })
}

function remove(taskId) {
    return storageService.remove(BOARDS_KEY, taskId)
    // return await httpService.delete('board/' + taskId)
}

function save(task) {
    const taskCopy = JSON.parse(JSON.stringify(task))
    return taskCopy._id ? storageService.put(BOARDS_KEY, taskCopy) : storageService.post(BOARDS_KEY, taskCpy)
    // if (task._id) return await httpService.put('board/' + task._id, task)
    // else return await httpService.post('board/', task)
}

function getEmptyTask() {
    // return {
    //     txt: '',
    //     isDone: false,
    //     doneAt: null
    // }
}

function getById(taskId) {
    return storageService.get(BOARDS_KEY, taskId)
    // return await httpService.get('board/' + taskId)
}