<template>
  <div class="login">
    <div class="row">
      <div class="col offset-m3 m6 s12">
        <div class="header">
          <p>Hello there!<br>
            Let’s <strong>login</strong> to view or add to-dos
          </p>
        </div>
        <div class="card">
          <form v-on:submit.prevent="authenticateUser">
            <div class="card-content">
                <div class="input-field">
                  <input id="username" type="text" v-model="username"  @focus="!hideUserNameError()">
                  <label class="active" for="username">Username</label>
                </div>
                <span class="username-error red-text hide">
                  <i class="material-icons">error_outline</i>Invalid username
                </span>
              <input type="submit" class="btn-flat right blue-text noPadding" value="SIGN IN">
              <br>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: null,
      baseUrl: 'http://localhost:3000/'
    }
  },
  methods: {
    authenticateUser () {
      if (!this.username) {
        document.querySelector('.username-error').classList.remove('hide')
      } else {
        this.$http.get(`${this.baseUrl}users`).then(response => {
          // Find and authenticate the user
          let user = response.body.find(user => user['username'] === this.username)

          if (user) {
            // Store the currentUser object in LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(user))

            // Redirect to /tasks
            this.$router.push({path: '/tasks'})
          } else {
            // Show no user found error
            document.querySelector('.username-error').classList.remove('hide')
          }
        })
      }
    },
    hideUserNameError () {
      document.querySelector('.username-error').classList.add('hide')
    }
  }
}
</script>

<style lang="scss" scoped>

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

  .card {
    margin-top: 50px;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
  }

  .username-error {
    display: flex;
    position: absolute;
    right: 20px;
    top: 40%;
  }


</style>
