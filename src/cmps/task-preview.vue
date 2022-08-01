<template>
    <section class="task-cover-container" @mouseover="isDragOver = true" @mouseleave="isDragOver = false">
        <!-- <section class="task-cover-container" @mouseover="isDragOver = true" @mouseleave="isDragOver = false"> -->
        <div
            v-if="task.cover"
            class="task-cover"
            :class="{ img: task.cover.length > 10 }"
            :style="coverBackground"
        ></div>
        <article class="task-preview" @click="openDetails" :class="{ covered: task.cover }">
            <div class="edit-btn flex flex-center">
                <span class="flex"><img src="../assets/edit.svg" /></span>
            </div>
            <div v-if="task.labelIds" class="task-labels flex">
                <div
                    v-for="label in getLabels"
                    class="label"
                    :class="{ opened: board?.isLabelsTextShow }"
                    :style="{ backgroundColor: label.color }"
                    @click.stop="showLabelText(label)"
                    :title="label.title"
                >
                    <h4 v-if="board?.isLabelsTextShow">{{ label.title }}</h4>
                </div>
            </div>
            <p>{{ task.title }}</p>

            <div class="footer flex space-between align-center">
                <div class="badges flex">
                    <span v-if="task.isWatched" title="This card has a description." class="icon-sm i-eye"></span>
                    <div
                        v-if="task.dueDate"
                        title="due date"
                        class="due-date flex"
                        :class="{
                            overdue: overDueTxt === 'over due',
                            today: overDueTxt == 'today',
                        }"
                    >
                        <span class="icon-sm i-clock"></span>
                        <span class="number">{{ overDueTxt }}</span>
                    </div>
                    <span v-if="task.description" title="This card has a description." class="icon-sm i-desc"></span>
                    <span v-if="task.comments?.length" title="Comments" class="icon-sm i-comment"
                        ><span class="number">{{ task.comments.length }}</span></span
                    >
                    <span v-if="task.attachments?.length" title="Attachments" class="icon-sm i-attachment"
                        ><span class="number">{{ task.attachments.length }}</span></span
                    >
                    <span v-if="task.todoLists?.length" title="Check list" class="icon-sm i-checklist">
                        <span class="number">{{ taskTodosStatus }}</span>
                    </span>
                </div>
                <div class="members">
                    <!-- v-if="task.memberIds?.length || (this.$store.getters.isMemberDrag && isDragOver)" -->
                    <!-- style="float: right" -->
                    <Container
                        group-name="3"
                        orientation="horizontal"
                        :get-child-payload="getChildPayload"
                        @drop="onMemberDrop($event)"
                        class="member-drop-container"
                    >
                        <Draggable>&nbsp;</Draggable>
                    </Container>
                    <div v-if="task.memberIds?.length" class="membersImgs flex">
                        <span v-for="member in getMembers">
                            <img :src="member.imgUrl" :title="member.fullname + ' (' + member.username + ')'" />
                        </span>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
    name: 'task-preview',
    props: {
        task: Object,
        group: Object,
        boardMembers: Object,
        boardLabels: Object,
    },
    data() {
        return {
            labelsIds: null,
            members: null,
            isDragOver: false,
        }
    },
    created() {},
    methods: {
        showLabelText(label) {
            console.log(label)
            // this.$emit('showLabelText')
            this.$store.dispatch({
                type: 'setState',
                action: 'toggleLabelsText',
                board: this.board,
            })
        },
        openDetails() {
            const boardId = this.$route.params.id
            this.$router.push(boardId + `/${this.group.id}/${this.task.id}`)
        },
        getChildPayload(idx) {
            return this.getMembers[idx]
        },
        async onMemberDrop(dropResult) {
          const member = dropResult.payload
          if (dropResult.addedIndex !== null && !this.task.memberIds.includes(member._id)) {
            const activity = {
                txt: 'edited the card members',
                createdAt: Date.now(),
                byMember: this.$store.getters.loggedinUser,
                task: this.task,
            }
            this.$store.commit({ type: 'newActivity', activity })
                this.$store.dispatch({
                    type: 'setState',
                    action: 'toggleMember',
                    groupId: this.group.id,
                    taskId: this.task.id,
                    memberId: member._id,
                })
            }
        },
    },
    computed: {
        showMembers(memberId) {
            const members = this.boardMembers.filter(member => member.id === memberId)
            return members
        },
        getMembers() {
            const members = this.boardMembers.filter(member => this.task.memberIds.includes(member._id))
            return members
        },
        getLabels() {
            const labels = this.boardLabels.filter(label => this.task.labelIds.includes(label.id))
            return labels
        },
        board() {
            return this.$store.getters.board
        },
        coverBackground() {
            const cover = this.task.cover
            if (cover.length > 10) {
                return `background-image: url('${cover}')`
            } else {
                return `background-color: ${cover}`
            }
        },
        taskTodosStatus() {
            let allTodos = 0,
                doneTodos = 0
            this.task.todoLists.forEach(list => {
                allTodos += list.todos.length
                doneTodos += list.todos.filter(td => td.isDone).length
            })
            return doneTodos + '/' + allTodos
        },
        overDueTxt() {
            const SECS_IN_24H = 86400
            const secsPassed = (Date.now() - this.task.dueDate) / 1000
            if (Math.abs(secsPassed) < SECS_IN_24H) return 'today'
            if (secsPassed > 0) return 'over due'
            return 'on time'
        },

    },
    components: {
        Container,
        Draggable,
    },
    unmounted() {},
}
</script>
