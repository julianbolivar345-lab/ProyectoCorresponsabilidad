<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="login">

      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />

      <br><br>

      <input
        v-model="password"
        type="password"
        placeholder="Password"
      />

      <br><br>

      <button>
        Iniciar Sesión
      </button>

    </form>

    <br>

    <router-link to="/olvide-password">
      ¿Olvidaste tu contraseña?
    </router-link>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = async () => {

  const response = await fetch(
    'http://localhost:3000/api/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
  )

  const data = await response.json()

  alert(data.mensaje || data.error)
}
</script>