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
            boardService.save(currBoard)
        },
        updateTask(state, { groupId, task }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const idx = group.tasks.findIndex(t => t.id === task.id)
            group.tasks.splice(idx, 1, task)
        },
        addTask(state, { groupId, task }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            group.tasks.push(task)
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
                console.log('couldnt load boards');
            }
        },
        async saveBoard({ commit }, { board }) {
            try {
                const type = board._id ? 'updateBoard' : 'addBoard'
                const boardToSave = await boardService.save(board)
                commit({ type, board: boardToSave })
            } catch {
                console.log('couldnt save board');
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                await boardService.remove(boardId)
                commit({ type: 'removeBoard', boardId })
            } catch {
                console.log('couldnt remove board');
            }
        },
        setCurrBoard({ commit }, { board }) {
            boardService.setCurrBoard(board)
            commit({ type: 'setBoard', board })
        },
        async saveTask({ commit }, { groupId, task }) {
            try {
                await boardService.saveTask(groupId, task)
                const type = task.id ? 'updateTask' : 'addTask'
                commit({ type, groupId, task })
            }
            catch {
                console.log('couldnt save task');
            }
        }
    }
}