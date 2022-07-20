import { boardService } from '../../services/board-service'

export default {
    state: {
        boards: [],
        currBoard: null,
    },
    getters: {
        board({ currBoard }) {
            return currBoard
        },
        boards({ boards }) {
            return boards
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
            state.currBoard = boards[0] //until we make a board selection page
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(b => b._id === board._id)
            state.boards.splice(idx, 1, board)
        },
        removeBoard(state, { boardId }) {
            const idx = state.boards.findIndex(b => b._id === boardId)
            state.boards.splice(idx, 1)
        },
        group(state, { change, group }) {
            const idx = state.currBoard.groups.findIndex(g => g.id === group.id)
            switch (change) {
                case ('add'): state.currBoard.groups.push(group)
                case ('update'): state.currBoard.groups.splice(idx, 1, group)
                case ('remove'): state.currBoard.groups.splice(idx, 1)
            }
        },
        task(state, { change, groupId, task }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const idx = group.tasks.findIndex(t => t.id === task.id)
            switch (change) {
                case ('add'): group.tasks.push(task); break;
                case ('update'): group.tasks.splice(idx, 1); break;
                case ('remove'): group.tasks.splice(idx, 1)
            }
        },
        setBoard(state, { board }) {
            state.currBoard = board
        }
    },
    actions: {
        async loadBoards({ commit }) {
            try {
                const boards = await boardService.query()
                commit({ type: 'setBoards', boards })
            } catch {
                console.log('couldnt load boards')
            }
        },
        async board({ commit }, { action, board }) {
            try {
                switch (action) {
                    case ('save'): {
                        const type = board._id ? 'updateBoard' : 'addBoard'
                        const boardToSave = await boardService.saveBoard(board)
                        commit({ type, board: boardToSave })
                        break
                    }
                    case ('remove'): {
                        await boardService.removeBoard(board._id)
                        commit({ type: 'removeBoard', boardId: board._id })
                        break
                    }
                    case ('set'): {
                        const boardFromId = await boardService.getById(board)
                        boardService.setCurrBoard(boardFromId)
                        commit({ type: 'setBoard', board: boardFromId })
                        break;
                    }
                }
            } catch (err) {
                console.error(err)
            }
        },
        async group({ commit }, { action, group }) {
            try {
                if (action === 'save') {
                    const type = group.id ? 'updateGroup' : 'addGroup'
                    const savedGroup = await boardService.saveGroup(group)
                    commit({ type, group: savedGroup })
                } else if (action === 'remove') {
                    await boardService.removeGroup(group)
                    commit({ type: 'removeGroup', group })
                }
            }
            catch (err) {
                console.error(err)
            }
        },
        async task({ commit }, { action, groupId, task }) {
            try {
                let change
                if (action === 'save') {
                    change = task.id ? 'update' : 'add'
                    const savedTask = await boardService.saveTask(groupId, task)
                } else if (action === 'remove') {
                    change = action
                    await boardService.removeTask(groupId, task)
                }
                commit({ type: 'task', change, groupId, task })
            } catch (err) {
                console.error(err)
            }
        },
    }
}