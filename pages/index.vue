<template>
  <div class="mypage-wrapper">
    <h1>MyPage</h1>
    <hr class="line" />
    <template v-if="userName">
      <img src="~/assets/user.svg" />
      <p class="text">
        Hello
        <span class="user-name">{{ userName }}</span>
      </p>
    </template>
    <template v-else>
      <nuxt-link to="/login">
        <button>login</button>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    return { userName: store.state.userName }
  }
}
</script>

<style scoped>
.mypage-wrapper {
  width: 480px;
  margin: 40px auto 0;
  background: #eee;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
}

h1 {
  margin-bottom: 16px;
}

.line {
  margin-bottom: 16px;
}

img {
  width: 80px;
  height: 80px;
  display: inline-block;
  margin-bottom: 16px;
}

.text {
  font-size: 20px;
}

.user-name {
  font-weight: bold;
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
