<!-- render page đăng kí -->

<template>
  <div class="register-page">
    <h1>Đăng Kí Tài Khoản</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Tên Đăng Nhập:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mật Khẩu:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Đăng Kí</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");

const handleRegister = () => {
  // Handle registration logic here
  console.log("Registering:", { username, email, password });
};
</script>
<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>
