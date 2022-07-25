import { boardService } from '../../services/board-service'
import { utilService } from '../../services/util-service.js'
import { applyDrag } from '../../services/dnd-util.service'

export default {
    state: {
        boards: [],
        currBoard: null,
        currTaskData: null,
    },
    getters: {
        board({ currBoard }) {
            return currBoard
        },
        boards({ boards }) {
            return boards
        },
        boardMembers({ currBoard }) {
            return currBoard.members
        },
        boardLabels({ currBoard }) {
            return currBoard.labels
        },
        currTaskData({ currTaskData }) {
            return currTaskData
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
            state.currBoard = boards[0]
        },
        setCurrTask(state, { groupId, taskId }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const task = group.tasks.find(t => t.id === taskId)
            state.currTaskData = { group, task }
        },
        board(state, { change, board }) {
            const idx = state.boards.findIndex(b => b._id === board._id)
            switch (change) {
                case 'add':
                    state.boards.push(board)
                    break
                case 'update':
                    state.boards.splice(idx, 1, board)
                    break
                case 'remove':
                    state.boards.splice(idx, 1)
                    break
                case 'set':
                    state.currBoard = board
                    break
            }
        },
        //group
        duplicateGroup(state, { group }) {
            group.id = utilService.makeId()
            state.currBoard.groups.push(group)
        },
        toggleWatchGroup(state, { groupId }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            if (group.isWatched) group.isWatched = false
            else group.isWatched = true
        },
        //task
        editTaskTitle(state, { taskId, groupId, title }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const task = group.tasks.find(t => t.id === taskId)
            task.title = title
        },
        saveTaskDescription(state, { taskId, groupId, description }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const task = group.tasks.find(t => t.id === taskId)
            task.description = description
        },
        archiveTask(state, { taskId, groupId }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const taskIdx = group.tasks.findIndex(t => t.id === taskId)
            group.tasks.splice(taskIdx, 1)
        },
        //labels
        toggleLabel(state, { taskId, groupId, labelId }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const task = group.tasks.find(t => t.id === taskId)

            const labelIdx = task.labelIds.findIndex(id => id === labelId)
            if (labelIdx !== -1) task.labelIds.splice(labelIdx, 1)
            else if (task.labelIds.length < 4) task.labelIds.push(labelId)
        },
        saveLabel(state, { taskId, groupId, label }) {
            console.log('ss');
            //boardwide
            if (label.id) {
                const idx = state.currBoard.labels.findIndex(l => l.id === label.id)
                state.currBoard.labels.splice(idx, 1, label)
            } else {
                const group = state.currBoard.groups.find(g => g.id === groupId)
                const task = group.tasks.find(t => t.id === taskId)
                if (task.labelIds.length >= 4) return
                label.id = utilService.makeId()
                state.currBoard.labels.push(label)
                task.labelIds.push(label.id)
            }
        },
        //members
        toggleMember(state, { taskId, groupId, memberId }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const task = group.tasks.find(t => t.id === taskId)
            const memberIdx = task.memberIds.findIndex(mId => mId === memberId)
            if (memberIdx !== -1) task.memberIds.splice(memberIdx, 1)
            else task.memberIds.push(memberId)
        },
        toggleBoardStarred({currBoard}) {
            currBoard.isStarred = !currBoard.isStarred
        },

        //d&d
        dragTask(state, { groupIndex, board, newGroup }) {
            board.groups.splice(groupIndex, 1, newGroup)
            state.currBoard = board
        },
        group(state, { change, group }) {
            const idx = state.currBoard.groups.findIndex(g => g.id === group.id)
            switch (change) {
                case 'add':
                    state.currBoard.groups.push(group)
                    break
                case 'update':
                    state.currBoard.groups.splice(idx, 1, group)
                    break
                case 'remove':
                    state.currBoard.groups.splice(idx, 1)
                    break
            }
        },
        task(state, { change, groupId, task }) {
            const group = state.currBoard.groups.find(g => g.id === groupId)
            const idx = group.tasks.findIndex(t => t.id === task.id)
            switch (change) {
                case 'add':
                    group.tasks.push(task)
                    break
                case 'update':
                    group.tasks.splice(idx, 1, task)
                    state.currTaskData.task = task
                    break
                case 'remove': {
                    group.tasks.splice(idx, 1)
                }
            }
        },
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
            } catch (err) {
                console.error(err)
            }
        },
        async saveBoard({ state }, { board }) { /////////////////////// 
            if (!board) board = state.currBoard
            try {
                await boardService.saveBoard(board)
            } catch (err) {
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
            } catch (err) {
                console.error(err)
            }
        },
        async task({ commit }, { action, groupId, task }) {
            try {
                let change
                if (action === 'save') {
                    change = task.id ? 'update' : 'add'
                    console.log(change);
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
        //group
        duplicateGroup({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        toggleWatchGroup({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        //task
        editTaskTitle({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        saveTaskDescription({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        archiveTask({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        //labels
        toggleLabel({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        saveLabel({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        //members
        toggleMember({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })
        },
        toggleBoardStarred({ commit, dispatch }, payload) {
            commit(payload)
            dispatch({ type: 'saveBoard' })            
        },

        //d&d
        async updateGroups({ commit }, { groups }) {
            // console.log('groups:', groups)
            const updatedBoard = await boardService.updateGroups(groups)
            // commit({ type: 'board', change: 'update', board: updatedBoard })
            commit({ type: 'board', change: 'set', board: updatedBoard })
        },
        async onColumnDrop({ state, commit, dispatch }, { dropResult }) {
            const board = Object.assign({}, state.currBoard)
            board.groups = applyDrag(board.groups, dropResult)
            commit({ type: 'board', change: 'set', board })

            const updatedBoard = await boardService.updateGroups(board.groups)
        },
        async onCardDrop({ state, commit, dispatch }, { groupId, dropResult }) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const board = Object.assign({}, state.currBoard)
                const group = board.groups.filter(g => g.id === groupId)[0]
                const groupIndex = board.groups.indexOf(group)
                const newGroup = Object.assign({}, group)
                newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
                // board.groups.splice(groupIndex, 1, newGroup)
                // this.scene = scene
                commit({ type: 'dragTask', groupIndex, board, newGroup })
                // commit({ type: 'board', change: 'dragTask', board })

                const updatedBoard = await boardService.updateGroups(board.groups)
            }
        },
    },
}
