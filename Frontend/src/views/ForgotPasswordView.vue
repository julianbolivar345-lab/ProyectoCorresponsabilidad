<template>
  <div>
    <h1>Recuperar contraseña</h1>

    <form @submit.prevent="recuperar">

      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />

      <br><br>

      <button>
        Recuperar
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const recuperar = async () => {

  const response = await fetch(
    'http://localhost:3000/api/olvide-password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    }
  )

  const data = await response.json()

  alert(data.mensaje || data.error)
}
</script>