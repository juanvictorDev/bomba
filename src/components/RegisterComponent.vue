<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              
              <v-toolbar color="blue" dark flat>
                <v-toolbar-title>Registro</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuario"
                    type="text"
                    color="blue"
                    v-model="novaConta.usuario"
                  />
                  <v-text-field
                    label="Email"
                    type="text"
                    color="blue"
                    v-model="novaConta.email"
                  />
                  <v-text-field
                    label="Senha"
                    type="password"
                    color="blue"
                    v-model="novaConta.senha"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue" dark @click="criarUsuario">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  import { db } from "../firebaseDB.js"

  export default {
    data() {
      return {
        novaConta:{
          usuario: '',
          email: '',
          senha: ''
        }
      };
    },
    methods: {
      criarUsuario(){
        db.collection('usuarios').add(this.novaConta).then((docRef) => {
          console.log("Document written with ID:", docRef.id);
          
        })
        .catch((error) => {
          console.error("Error adding document:", error);
        });
        
        this.novaConta = { usuario: '', email: '', senha: ''}
        this.$router.push('/login');
      }
    }
  };
</script>