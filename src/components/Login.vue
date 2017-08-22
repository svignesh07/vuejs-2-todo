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
                  <input id="username" type="text" class="validate" v-model="username" required="true">
                  <label class="active" for="username" data-error="Invalid" data-success="valid">Username</label>
                </div>
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

      } else {
        this.$http.get(`${this.baseUrl}users`).then(response => {
          // Find and authenticate the user
          let user = response.body.find(user => user['username'] === this.username)

          if (user) {
            // Store the currentUser object in LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(user))
            console.log(localStorage.getItem('currentUser'))
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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

.card {
  margin-top: 50px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
}

</style>
