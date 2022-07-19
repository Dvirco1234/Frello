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

        }
    }
}
