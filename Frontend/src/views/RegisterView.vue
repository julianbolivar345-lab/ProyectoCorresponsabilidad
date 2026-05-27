<template>
  <div>
    <h1>Registro</h1>

    <form @submit.prevent="registro">

      <input
        v-model="nombre"
        type="text"
        placeholder="Nombre"
      />

      <br><br>

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
        Registrarse
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const email = ref('')
const password = ref('')

const registro = async () => {

  const response = await fetch(
    'http://localhost:3000/api/registro',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nombre.value,
        email: email.value,
        password: password.value
      })
    }
  )

  const data = await response.json()

  alert(data.mensaje || data.error)
}
</script>