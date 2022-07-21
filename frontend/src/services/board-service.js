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

const demoBoards = [
    {
        "_id": "b101",
        "title": "Robot dev proj",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
        },
        "labels": [
            {
                "id": "l101",
                "title": "CSS",
                "color": "#61bd4f"
            },
            {
                "id": "l102",
                "title": "Frontend",
                "color": "#f2d600"
            },
            {
                "id": "l103",
                "title": "Backend",
                "color": "#ff9f1a"
            },
            {
                "id": "l104",
                "title": "High Priority",
                "color": "#eb5a46"
            },
            {
                "id": "l105",
                "title": "Design Team",
                "color": "#c377e0"
            },
            {
                "id": "l106",
                "title": "Pages",
                "color": "#0079bf"
            },
            {
                "id": "l107",
                "title": "Components",
                "color": "#00c2e0"
            },
            {
                "id": "l108",
                "title": "Services",
                "color": "#51e898"
            },
            {
                "id": "l109",
                "title": "Bugs",
                "color": "#ff78cb"
            },
            {
                "id": "l110",
                "title": "Live",
                "color": "#344563"
            },
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Dvir Cohen",
                "imgUrl": "https://trello-members.s3.amazonaws.com/62d05e8a02d833768da2edbf/a8f79c4f26b07814875513041bdafceb/30.png"
            },
            {
                "_id": "u102",
                "fullname": "Shalhev Nagauker",
                "imgUrl": "https://trello-members.s3.amazonaws.com/62d05e2907aa7637f2b3a943/8fb46202f6e9c14172ad453caec4860a/50.png"
            },
            {
                "_id": "u103",
                "fullname": "Yuval Rubin",
                "imgUrl": "https://trello-members.s3.amazonaws.com/62d05ed514549211e1ea514c/3e83b671e6d09295d09d3cdfe506b062/50.png"
            },
        ],
        "groups": [
            {
                "id": "g101",
                "title": "📝 To DO",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u101"
                        ],
                        "labelIds": [
                            "l103"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "createdAt": 1658396859459
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u102"
                        ],
                        "labelIds": [
                            "l104"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "createdAt": 1658396859459
                    },
                    {
                        "title": "Upload to Heroku",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u101"
                        ],
                        "labelIds": [
                            "l101"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "pWcK0",
                        "createdAt": 1658396859459
                    },
                    {
                        "title": "Add labels task feature",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                        ],
                        "labelIds": [
                            "u104"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "0oOOw",
                        "createdAt": 1658396908612
                    },
                    {
                        "title": "Create board nav-bar",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                        ],
                        "labelIds": [
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "roRG3",
                        "createdAt": 1658396944631
                    },
                    {
                        "title": "Add board chat feature",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                        ],
                        "labelIds": [
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "HjnpL",
                        "createdAt": 1658397042840
                    },
                    {
                        "title": "Create user profile page",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                        ],
                        "labelIds": [
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "bPLRY",
                        "createdAt": 1658397062775
                    }
                ],
                "style": {
                }
            },
            {
                "id": "g102",
                "title": "💻 In Progress",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
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
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Dvir Cohen",
                                    "imgUrl": "https://trello-members.s3.amazonaws.com/62d05e8a02d833768da2edbf/a8f79c4f26b07814875513041bdafceb/30.png"
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
                        "memberIds": [
                            "u101",
                            "u102",
                            "u103",
                        ],
                        "labelIds": [
                            "l101",
                            "l102"
                        ],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u102",
                            "username": "Shalhev",
                            "fullname": "Shalhev Nagauker",
                            "imgUrl": "https://trello-members.s3.amazonaws.com/62d05e2907aa7637f2b3a943/8fb46202f6e9c14172ad453caec4860a/50.png"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    },
                    {
                        "title": "Create CSS Architecture",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u101"
                        ],
                        "labelIds": [
                            "l101"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "EGwRM",
                        "createdAt": 1658396710850
                    }
                ],
                "style": {
                }
            },
            {
                "title": "📅 Done",
                "tasks": [
                    {
                        "title": "Open Github repository",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u101"
                        ],
                        "labelIds": [
                            "l110"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "DxAzQ",
                        "createdAt": 1658396775827
                    },
                    {
                        "title": "Initialize new project",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u101"
                        ],
                        "labelIds": [
                            "l110"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "hXco7",
                        "createdAt": 1658396791740
                    },
                    {
                        "title": "Create App header",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u102", "u103"
                        ],
                        "labelIds": [
                            "l107", "l101"
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "DySkT",
                        "createdAt": 1658396812644
                    },
                    {
                        "title": "Users imgs in task preview",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u103"
                        ],
                        "labelIds": [
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "Deu7G",
                        "createdAt": 1658397176623
                    },
                    {
                        "title": "Show labels in task preview",
                        "description": "",
                        "status": "in-progress",
                        "memberIds": [
                            "u102"
                        ],
                        "labelIds": [
                        ],
                        "comments": [
                        ],
                        "checkLists": [
                        ],
                        "byMember": null,
                        "dueDate": null,
                        "style": null,
                        "id": "ImYW7",
                        "createdAt": 1658397213090
                    }
                ],
                "style": null,
                "id": "3FIoa"
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Dvir Cohen",
                    "imgUrl": "https://trello-members.s3.amazonaws.com/62d05e8a02d833768da2edbf/a8f79c4f26b07814875513041bdafceb/30.png"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ]
    }
]
