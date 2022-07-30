import { userService } from '../../services/user-service'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from '../services/socket.service'

// var localLoggedinUser = null
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null)

export default {
    state: {
        // loggedinUser: userService.getLoggedinUser(),
        // users: [],
        loggedinUser: null
    },
    getters: {
        users({ users }) { return users },
        loggedinUser({ loggedinUser }) { return loggedinUser },
        watchedUser({ watchedUser }) { return watchedUser }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = (user) ? { ...user } : {
                "_id": "u104",
                "fullname": "Guest",
                "username": "demo_user",
                "imgUrl": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cmVjdCB3aWR0aD0iNzUyIiBoZWlnaHQ9Ijc1MiIgZmlsbD0iIzAwNzhiZiIvPgogIDxwYXRoIGQ9Im01MzEuMjUgNTY2LjE3YzAuNTkzNzUgNC4yOTMtMC41OTM3NSA4LjU4Mi0zLjQwMjMgMTEuODQtMi44MTI1IDMuMjU3OC02Ljk1NyA1LjE3OTctMTEuMjQ2IDUuMTc5N2gtMjgxLjE5Yy00LjI5MyAwLTguNDM3NS0xLjkyNTgtMTEuMjQ2LTUuMTc5Ny0yLjgxMjUtMy4yNTc4LTMuOTk2MS03LjU0NjktMy40MDIzLTExLjg0bDEyLjcyNy04Mi43M2MxMC45NTMtNzAuODkxIDcwLjg5MS0xMjIuMjQgMTQyLjUyLTEyMi4yNHMxMzEuNTcgNTEuMzU1IDE0Mi41MiAxMjIuMjRsMTIuNzI3IDgyLjczem0tMTU1LjI1LTIxOS43N2M0OC45ODQgMCA4OC43OTctMzkuODA5IDg4Ljc5Ny04OC43OTcgMC00OC45ODQtMzkuODA5LTg4Ljc5Ny04OC43OTctODguNzk3LTQ4Ljk4NCAwLTg4Ljc5NyAzOS44MDktODguNzk3IDg4Ljc5NyAwIDQ4Ljk4NCAzOS44MDkgODguNzk3IDg4Ljc5NyA4OC43OTd6IiBmaWxsPSIjZmZmIi8+CiA8L2c+Cjwvc3ZnPgo="
            }
        },
        setWatchedUser(state, { user }) {
            state.watchedUser = user
        },
        setUsers(state, { users }) {
            state.users = users
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        setUserScore(state, { score }) {
            state.loggedinUser.score = score
        },
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            console.log('userCred:', userCred)
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async loadUsers({ commit }) {
            try {
                const users = await userService.getUsers()
                commit({ type: 'setUsers', users })
            } catch (err) {
                console.log('userStore: Error in loadUsers', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }
        },
        async getLoggedinUser({ commit }) {
            try {
                const user = await userService.getLoggedinUser()
                commit({ type: 'setLoggedinUser', user })
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }
        }
    }
}