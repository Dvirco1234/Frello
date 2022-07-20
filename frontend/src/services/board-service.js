// import { httpService } from './http-service'
import { storageService } from './async-storage.service'
import { utilService } from './util-service.js'

const BOARDS_KEY = 'boardsDB'

export const boardService = {
    query,
    getById,
    getEmpty,
    save,
    remove,
}

async function query() {
    try {
        let boards = await storageService.query()
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

async function remove(boardId) {
    try {
        return storageService.remove(BOARDS_KEY, boardId)
    } catch (err) {
        console.error('service couldnt remove board')
        throw (err)
    }
}

async function save(board) {
    try {
        const boardToSave = JSON.parse(JSON.stringify(board))
        const savedBoard = await boardToSave._id ?
            storageService.put(BOARDS_KEY, boardToSave)
            : storageService.post(BOARDS_KEY, boardToSave)
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
        id: utilService.makeId(),
        title: 'new Task',
        description: '',
        status: "in-progress",
        memberIds: [],
        labelIds: [],
        comments: [],
        checkLists: [],
        createdAt: Date.now(),
        byMember: null,
        dueDate: null,
        style: null
    }
}

function _emptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'New group',
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
            "color": "#61bd33"
        }
    ],
    "members": [
        {
            "_id": "u101",
            "fullname": "Tal Tarablus",
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
                    "memberIds": ["u101"],
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
        }
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