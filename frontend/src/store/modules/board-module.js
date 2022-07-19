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
            state.currBoard = boards[0]
        }

    },
    actions: {
        async loadBoards({ commit }) {
            const boards = await boardService.query()
            commit({ type: 'setBoards', boards })
        }
    },
}
