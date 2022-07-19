import { httpService } from './http-service'
import { storageService } from './async-storage.service'

const BOARDS_KEY = 'boardsDB'
// const gCurrrBoard = 

export const boardService = {
    query,
    getById,
    getEmptyTask,
    save,
    remove,
}

function query() {
    // return storageService.query(BOARDS_KEY).then(tasks => {
    //     const regex = new RegExp(filter.txt, 'i')
    //     let filteredTask
    //     if (filter.condition === 'all') filteredTask = tasks.filter(task => regex.test(task.txt))
    //     else filteredTask = tasks.filter(task => regex.test(task.txt))
    //     return Promise.resolve(filteredTask)
    // })
    // return await httpService.get('board', { params: filterBy })
    return Promise.resolve(gCurrrBoard)
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



const gCurrrBoard = {
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
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "c101",
                "title": "Replace Logo"
            }
        }
    ],
}