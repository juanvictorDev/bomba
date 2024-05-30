<template>
  <v-app>
    <HeaderComponent/>
    
    <v-main>
      <div style="display: flex; justify-content: center;">
        <v-btn elevation="3" x-largue style="margin: 20px;" @click="abrirFormulario">Adicionar Curso</v-btn> 
      </div>

      <!-- DIALOG NOVO CURSO -->
      <v-dialog v-model="dialog" persistent width="600">
        <v-card>
          <v-card-title>Adicionar Novo Curso</v-card-title>
          <v-card-text>
            <v-text-field label="Nome" v-model="novoCurso.nome"></v-text-field>
            <v-text-field label="Descrição" v-model="novoCurso.descricao"></v-text-field>
            <v-text-field label="Duração" v-model="novoCurso.duracao"></v-text-field>

            <v-radio-group v-model="novoCurso.tipoCurso">
              <v-radio label="Padrão" value="padrao"></v-radio>
              <v-radio label="Premium" value="premium"></v-radio>
            </v-radio-group>
            <v-text-field v-if="novoCurso.tipoCurso === 'premium'" label="Preço" v-model="novoCurso.preco"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="cancelar" color="pink darken-1" style="margin-bottom: 15px; color: white;"> Cancelar </v-btn>
            <v-btn @click="criar" style="margin-bottom: 15px; color: white;" color="light-blue darken-3"> Salvar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <!-- LISTA CURSOS -->
      <v-expansion-panels focusable style="max-width: 800px; margin: 0 auto;">
        <v-expansion-panel v-for="curso in cursos" :key="curso.id">
          <v-expansion-panel-header>
            <h3>{{ curso.nome }}
              <v-icon v-if="curso.tipoCurso === 'premium'" color="amber accent-3" class="star">mdi-star</v-icon>
            </h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <br>
            <p>{{ curso.descricao }}</p>
            <p><b>Duração:</b> {{ curso.duracao }}</p>
            <p v-if="curso.tipoCurso === 'premium'"><b>Preço:</b> {{ curso.preco }}</p>
            <v-btn color="pink darken-1" elevation="0" style="margin-right: 10px; color: white;" @click="excluirCurso(curso)">
              Excluir
              <v-icon right>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn color="warning" elevation="0" @click="abrirEdicaoCurso(curso)">
              Editar  
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- DIALOG EDICAO -->
      <v-dialog v-model="dialogEdicao" persistent width="600">
        <v-card>
          <v-card-title>Editar Curso</v-card-title>
          <v-card-text>
            <v-text-field label="Nome" v-model="cursoEdicao.nome"></v-text-field>
            <v-text-field label="Descrição" v-model="cursoEdicao.descricao"></v-text-field>
            <v-text-field label="Duração" v-model="cursoEdicao.duracao"></v-text-field>

            <v-radio-group v-model="cursoEdicao.tipoCurso">
              <v-radio label="Padrão" value="padrao"></v-radio>
              <v-radio label="Premium" value="premium"></v-radio>
            </v-radio-group>
            <v-text-field v-if="cursoEdicao.tipoCurso === 'premium'" label="Preço" v-model="cursoEdicao.preco"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="cancelarEdicao" color="pink darken-1" style="margin-bottom: 15px; color: white;">Cancelar</v-btn>
            <v-btn @click="salvarEdicao" color="light-blue darken-3" style="color: white; margin-bottom: 15px;">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <br>
    <br>
    <FooterComponent/>
  </v-app>
</template>

<script>
  import FooterComponent from './FooterComponent.vue'
  import HeaderComponent from './HeaderComponent.vue'
  import api from '../axiosConfig.js'

  export default {
    components: {
      FooterComponent,
      HeaderComponent
    },
    data: () => ({
      dialog: false,
      dialogEdicao: false,
      cursos: [],
      novoCurso: {
        id: 0,
        nome: '',
        descricao: '',
        duracao: '',
        tipoCurso: "padrao",
        preco: ''
      },
      cursoEdicao: {
        id: 0,
        nome: '',
        descricao: '',
        duracao: '',
        tipoCurso: "padrao",
        preco: ''
      }
    }),
    methods: {
      abrirFormulario() {
        this.dialog = true;
        this.novoCurso = { nome: '', descricao: '', duracao: '', tipoCurso: "padrao", preco: '' }; 
      },

      cancelar() {
        this.dialog = false;
      },

      async criar() {
        this.dialog = false;
        try {
          await api.post('/cursos', this.novoCurso);
          this.fetchCursos();
        } catch (error) {
          console.error("Erro ao adicionar curso:", error);
        }
        this.novoCurso = { nome: '', descricao: '', duracao: '', tipoCurso: "padrao", preco: '' };
      },

      async excluirCurso(curso) {
        try {
          await api.delete('/cursos', { data: { id: curso.id } });
          this.fetchCursos();
        } catch (error) {
          console.error("Erro ao excluir curso:", error);
        }
      },

      abrirEdicaoCurso(curso) {
        this.dialogEdicao = true;
        this.cursoEdicao = { ...curso };
      },

      cancelarEdicao() {
        this.dialogEdicao = false;
      },

      async salvarEdicao() {
        try {
          await api.put('/cursos', this.cursoEdicao);
          this.fetchCursos();
        } catch (error) {
          console.error("Erro ao atualizar curso:", error);
        }
        this.dialogEdicao = false;
      },

      async fetchCursos() {
        try {
          const response = await api.get('/cursos');
          this.cursos = response.data;
        } catch (error) {
          console.error("Erro ao buscar cursos:", error);
        }
      }
    },

    created() {
      this.fetchCursos();
    }
  }
</script>

<style>
  .star {
    margin-bottom: 4px;
  }
</style>
