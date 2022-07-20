// import { httpService } from './http-service'
import { storageService } from './async-storage.service'
import { utilService } from './util-service.js'

const BOARDS_KEY = 'boardsDB'
var currBoard = null

export const boardService = {
    query,
    getById,
    getEmpty,
    removeBoard,
    saveBoard,
    saveGroup,
    removeGroup,
    saveTask,
    removeTask,
    setCurrBoard,
}

function setCurrBoard(board) {
    currBoard = JSON.parse(JSON.stringify(board))
}

async function saveGroup(group) {
    try {
        const groupToSave = JSON.parse(JSON.stringify(group))
        if (groupToSave.id) {
            const idx = currBoard.groups.findIndex(g => g.id === groupToSave.id)
            currBoard.groups.splice(idx, 1, groupToSave)
        } else {
            groupToSave.id = utilService.makeId()
            currBoard.groups.push(groupToSave)
        }
        await saveBoard(currBoard)
        return groupToSave
    }
    catch (err) {
        console.error('service couldnt save group');
        throw (err)
    }
}

async function removeGroup(group) {
    try {
        const idx = group.tasks.findIndex(g => g.id === group.id)
        currBoard.groups.splice(idx, 1,)
        await saveBoard(currBoard)
    } catch (err) {
        console.error('service couldnt remove group')
        throw (err)
    }
}

async function saveTask(groupId, task) {
    try {
        const taskToSave = JSON.parse(JSON.stringify(task))
        const group = currBoard.groups.find(g => g.id === groupId)
        if (task.id) {
            const idx = group.tasks.findIndex(t => t.id === taskToSave.id)
            group.tasks.splice(idx, 1, taskToSave)
        } else {
            taskToSave.id = utilService.makeId()
            taskToSave.createdAt = Date.now()
            group.tasks.push(taskToSave)
        }
        await saveBoard(currBoard)
        return taskToSave
    } catch (err) {
        console.error('service couldnt save task');
        throw (err)
    }
}
async function removeTask(groupId, task) {
    try {
        const group = currBoard.groups.find(g => g.id === groupId)
        const idx = group.tasks.findIndex(t => t.id === task.id)
        group.tasks.splice(idx, 1,)
        await saveBoard(currBoard)
    } catch (err) {
        console.error('service couldnt remove task')
        throw (err)
    }
}

async function query() {
    try {
        let boards = await storageService.query(BOARDS_KEY)
        if (!boards || !boards.length) {
            boards = _getDemoBoards()
            localStorage.setItem(BOARDS_KEY, JSON.stringify(boards))
        }
        return boards
    } catch (err) {
        console.error('service couldnt get boards')
        throw (err)
    }
}

async function getById(boardId) {
    try {
        const board = await storageService.get(BOARDS_KEY, boardId)
        return board
    } catch (err) {
        console.error('service couldnt get board')
        throw (err)
    }
}

async function removeBoard(boardId) {
    try {
        return storageService.remove(BOARDS_KEY, boardId)
    } catch (err) {
        console.error('service couldnt remove board')
        throw (err)
    }
}

async function saveBoard(board) {
    try {
        const savedBoard = await board._id ?
            storageService.put(BOARDS_KEY, board)
            : storageService.post(BOARDS_KEY, board)
        return savedBoard
        // if (task._id) return await httpService.put('board/' + task._id, task)
        // else return await httpService.post('board/', task)
    } catch (err) {
        console.error('service couldnt save board')
        throw (err)
    }
}

function getEmpty(type) {
    switch (type) {
        case 'group': return _emptyGroup()
        case 'task': return _emptyTask()
        default: return _emptyBoard()
    }
}

function _emptyTask() {
    return {
        title: '',
        description: '',
        status: "in-progress",
        memberIds: [],
        labelIds: [],
        comments: [],
        checkLists: [],
        byMember: null,
        dueDate: null,
        style: null
    }
}

function _emptyGroup() {
    return {
        title: '',
        tasks: [],
        style: null
    }
}

function _emptyBoard() {
    return {
        //id will be added by the storage on POST
        title: 'New project board',
        createdAt: Date.now(),
        createdBy: null,
        style: null,
    }
}

function _getDemoBoards() {
    return demoBoards
}

const demoBoards = [{
    "_id": "b101",
    "title": "Robot dev proj",
    // "archivedAt": null,
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "u101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "style": {},
    "labels": [
        {
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#f2d600"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com"
        },
        {
            "_id": "u102",
            "fullname": "Tali TLOLO",
            "imgUrl": "https://www.google.com"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            // "archivedAt": 1589983468418,
            "tasks": [
                {
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "c103",
                    "title": "Do that",
                    // "archivedAt": 1589983468418,
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "status": "in-progress",
                    "description": "description",
                    "comments": [
                        {
                            "id": "ZdPnm",
                            "txt": "also @yaronb please CR this",
                            "createdAt": 1590999817436.0,
                            "byMember": {
                                "_id": "u101",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        }
                    ],
                    "checklists": [
                        {
                            "id": "YEhmF",
                            "title": "Checklist",
                            "todos": [
                                {
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }
                            ]
                        }
                    ],
                    "memberIds": ["u101", "u102"],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        },
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "https://picsum.photos/200"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
}]