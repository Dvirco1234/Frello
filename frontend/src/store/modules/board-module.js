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
        board(state, { change, board }) {
            const idx = state.boards.findIndex(b => b._id === board._id)
            switch (change) {
                case ('add'): state.boards.push(board)
                case ('update'): state.boards.splice(idx, 1, board)
                case ('remove'): state.boards.splice(idx, 1)
            }
        },
        group(state, { change, group }) {
            const idx = state.currBoard.groups.findIndex(g => g.id === group.id)
            switch (change) {
                case ('add'): state.currBoard.groups.push(group); break;
                case ('update'): state.currBoard.groups.splice(idx, 1, group); break;
                case ('remove'): state.currBoard.groups.splice(idx, 1); break;
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
                let change
                if (action === 'save') {
                    change = board._id ? 'update' : 'add'
                    board = await boardService.saveBoard(board)
                } else if (action === 'remove') {
                    change = 'remove'
                    await boardService.removeBoard(board._id)
                } else if (action === 'set') {
                    change = 'set'
                    board = await boardService.getById(board)
                    boardService.setCurrBoard(board)
                }
                commit({ type: 'board', change, board })
            }
            catch (err) {
                console.error(err)
            }
        },
        async group({ commit }, { action, group }) {
            try {
                let change
                if (action === 'save') {
                    change = group.id ? 'update' : 'add'
                    group = await boardService.saveGroup(group)
                } else if (action === 'remove') {
                    change = action
                    await boardService.removeGroup(group)
                }
                commit({ type: 'group', change, group })
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
                    task = await boardService.saveTask(groupId, task)
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