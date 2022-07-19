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
        }

    },
    actions: {
        async loadBordes({ commit }) {
            const boards = await boardService.query()
            commit({ type: 'set-boards', boards })
        }
    },
}
