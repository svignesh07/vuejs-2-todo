<template>
  <div id="tasks" v-bind:class="{ overlay: show }">
    <img class="secondary-bg" src="../assets/images/lightgraybg.png" alt="secondary-bg">
    <div class="row">
      <div class="col offset-m2 m8">
        <div class="header">
          <p>Hey
            <strong>{{user.name }}!</strong><br> You have <strong>{{incomplete_tasks}}</strong> incomplete tasks for today.
            <a class="btn-flat noPadding yellow-text logout-button" v-on:click="logout()">logout</a>
          </p>
        </div>
        <br>
        <div class="card tasks-container">
          <form v-on:submit.prevent="addTask">
            <div class="card new_task_card absolute" v-bind:class="{ peep: peep, show: show }">
              <div class="card-content">
                <div class="input-field">
                  <input id="new_task" type="text" class="validate" v-model="task.title" @focus="!hideNoTaskError()">
                  <label for="new_task">Add new</label>
                </div>
                <span class="notask-error red-text hide">
                  <i class="material-icons">error_outline</i>Enter Task
                </span>
                <input type="submit" class="waves-effect btn-flat right noPadding blue-text" value="Add">
                <input type="button" class="waves-effect btn-flat right noPadding cancel-button" v-on:click="show=!show" value="Cancel">
                <br>
              </div>
            </div>
          </form>
          <div class="card-content relative">
            <a class="btn-floating btn-large waves-effect waves-light add-task absolute blue" @mouseover="peep = true" @mouseleave="peep = false" v-on:click="show=!show" v-bind:class="{'scale-transition': !show}">
              <i class="material-icons">add</i>
            </a>
            <a class="btn-floating btn-large waves-effect waves-light hide-task absolute grey lighten-5" v-on:click="show=!show" v-bind:class="{'scale-transition scale-out': !show}">
              <i class="material-icons red-text">remove</i>
            </a>
            <div class="row flex-box flex-wrap" v-if="tasks.length > 0">
              <div class="col xl3 l3 m6 s12 card-list flex-box" v-for="task in tasks">
                <div class="card task-card flex-grow-1" v-bind:class="{'completed': task.completed}">
                  <div class="card-content flex-box justify-content-space-between">
                    <p>{{ task.title }}</p>
                    <span>
                      <input :id="task.id" type="checkbox" class="" :checked='task.completed ? "checked" : null' v-on:click="updateTaskState(task, task.completed)" />
                      <label :for="task.id"></label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h5 class="center-align hide" v-else>No pending tasks</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasks',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('currentUser')),
      task: {
        title: null,
        userId: 1
      },
      tasks: [],
      peep: false,
      show: false,
      incomplete_tasks: 0
    }
  },

  methods: {
    fetchTasks () {
      this.$http.get(`http://localhost:3000/tasks?userId=${this.user.id}`).then(response => {
        // Reverse the response to show the recent tasks first
        this.tasks = response.data.reverse()
        this.incomplete_tasks = this.tasks.filter(function (v) { return v.completed === false }).length
      })
    },
    logout () {
      if (localStorage.getItem('currentUser')) {
        // Remove currentUser from localStorage - Simulate Delete Session
        localStorage.removeItem('currentUser')
        this.$router.push({path: '/'})
      }
    },
    hideNoTaskError () {
      document.querySelector('.notask-error').classList.add('hide')
    },
    addTask () {
      if (!this.task.title) {
        document.querySelector('.notask-error').classList.remove('hide')
      } else {
        let newtask = {
          userId: this.user.id,
          title: this.task.title,
          completed: false
        }

        this.$http.post(`http://localhost:3000/tasks`, newtask).then(response => {
          this.show = false
          this.fetchTasks()
        })
      }
    },
    updateTaskState (task, completed) {
      task.completed = !completed
      this.$http.put(`http://localhost:3000/tasks/${task.id}`, task).then(response => {
        this.fetchTasks()
      })
    }
  },

  mounted () {
    this.fetchTasks()
  }
}
</script>

<style lang="scss">

  #tasks.overlay {
    &::after {
      content: '';
      background: rgba(0,0,0,0.7);
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      position: fixed;
      overflow: hidden;
    }
  }

  .logout-button {
    z-index: 0;
    margin-left: 1em;
  }
  .cancel-button {
    margin-right: 2em;
  }

  .header {
    -webkit-animation: slideInRight 1.5s 1;
    animation: slideInRight 1.5s 1;
    p {
      font-size: 18px;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.7);
      strong {
        font-weight: bold;
        color: white;
      }
    }
  }

  .new_task_card {
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    z-index: -1;
    width: 70%;
    left: 15%;
    transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s ease-out;
    &.peep {
      z-index: -1;
      transform: translateY(-30px);
    }
    &.show {
      z-index: 1;
      transform: translateY(-30px);
    }
  }

  .tasks-container {
    -webkit-animation: slideUpTop 1.5s 1;
    animation: slideUpTop 1.5s 1;
    border-radius: 16px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
  }

  .add-task,
  .hide-task {
    right: 2em;
    top: -2em;
  }

  .add-task:focus,
  .add-task:active,
  .add-task:hover {
      filter: grayscale(20%);
  }

  .hide-task:focus,
  .hide-task:active,
  .hide-task:hover {
    filter: brightness(1.5);
  }

  .card-list {
    margin: 0 !important;
    min-height: 96px;
  }

  /* Card Style */

  .task-card {
    background-color: #f4f7f9;
    border: solid 1px #eaeff2;
    box-shadow: none;
    outline: none;
    .card-content {
      padding-left: 10px;
      padding-top: 10px;
      padding-right: 0;
      p {
        color: #8b9cab;
        margin-right: 1em;
      }
    }
    &.completed {
      background-color: #f4f7f9;
      border: solid 1px #eaeff2;
      box-shadow: none;
      border-left: 3px solid #33bdf6;
      .card-content {
        p {
          color: #263d52;
        }
      }
    }
  }

  .secondary-bg {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    animation: fadeIn 1.5s linear;
  }

  .notask-error {
    display: flex;
    position: absolute;
    right: 20px;
    top: 40%;
  }

</style>

