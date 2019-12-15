<template>
  <div class="login-wrapper">
    <h1>Login</h1>
    <hr class="line" />
    <p v-if="isError" class="error-message">
      ユーザーネームもしくはパスワードが誤っています
    </p>
    <label>
      UserName:
      <input v-model="name" type="text" class="name" />
    </label>
    <label>
      Password:
      <input v-model="password" type="password" class="password" />
    </label>
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: '',
    password: '',
    isError: false
  }),
  methods: {
    async login() {
      const users = await this.$axios.$get('http://localhost:8080/user')
      const isCorrect = users.some(
        (user) => user.name === this.name && user.password === this.password
      )
      if (isCorrect) {
        this.$store.commit('SET_USER', this.name)
        this.$router.push('/')
      } else {
        this.name = ''
        this.password = ''
        this.isError = true
      }
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  width: 480px;
  margin: 40px auto 0;
  background: #eee;
  padding: 40px;
  border-radius: 8px;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}

.line {
  margin-bottom: 16px;
}

.error-message {
  color: red;
  text-align: center;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  margin: 4px 0 32px;
}

button {
  background: #007c6b;
  border-radius: 3px;
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
</style>
