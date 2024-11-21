<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="email" label="Email" type="email" outlined dense />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          dense
          class="q-mt-sm"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          label="Log In"
          color="primary"
          @click="login"
          :loading="loading"
        />
      </q-card-actions>
      <q-card-section v-if="errorMessage" class="text-negative">
        {{ errorMessage }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      this.loading = true;
      this.errorMessage = "";
      try {
        const response = await axios.post(
          "http://68.183.142.21/api/v1/user/signin",
          {
            email: this.email,
            password: this.password,
          }
        );
        if (response.status === 200) {
          this.$router.push("/movies");
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Las credenciales son incorrectas";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.q-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
