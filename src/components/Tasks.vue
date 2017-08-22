<template>
  <div id="tasks" v-bind:class="{ overlay: show }">
    <div class="row">
      <div class="col offset-m2 m8">
        <div class="header">
          <p>Hey
            <strong>{{user.name }}!</strong><br> You have {{incomplete_tasks}} incomplete tasks for today.
            <a class="btn-flat noPadding yellow-text logout-button" v-on:click="logout()">logout</a>
          </p>
        </div>
        <br>
        <div class="card tasks-container">
          <div class="card-content relative">
            <div class="row flex-box flex-wrap" v-if="tasks.length > 0">
              <div class="col xl3 l3 m6 s12 card-list flex-box" v-for="task in tasks">
                <div class="card task-card flex-grow-1" v-bind:class="{'completed': task.completed}">
                  <div class="card-content flex-box justify-content-space-between">
                    <p>{{ task.title }}</p>
                    <span>
                      <input :id="task.id" type="checkbox" class="" :checked='task.completed ? "checked" : null' />
                      <label :for="task.id"></label>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="center-align" v-else>No tasks pending :-)</h4>
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


.tasks-container {
  border-radius: 16px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
}

.card-list {
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

</style>