<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              
              <v-toolbar color="blue" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    type="text"
                    color="blue"
                    v-model="login.email"
                  />
                  <v-text-field
                    label="Senha"
                    type="password"
                    color="blue"
                    v-model="login.senha"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-card-text >Não possui uma conta?
                  <span to="/register">
                    <router-link
                      to="/register"
                      style="text-decoration: none; color: dodgerblue">
                      Clique aqui
                    </router-link>
                  </span>
                </v-card-text>
                <v-spacer />
                <v-btn color="blue" dark @click="loginUser">Entrar</v-btn>
                <p v-if="loginError">{{ loginError }}</p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { auth } from "../firebaseDB.js"

export default {
  data() {
    return {
      login:{
        email: '',
        senha: '',
      },
      loginError: null,
    };
  },
  methods: {
    loginUser() {

    const email = this.login.email;
    const password = this.login.password;


    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential);
        this.$router.push('/'); 
      })
      .catch((error) => {

        console.error('Login error:', error);
        this.loginError = error.message; 
      });
    },
  },
};
</script>