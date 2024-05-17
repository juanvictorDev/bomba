<template>
  
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="light-blue darken-4 config">
        <strong class="subheading">&nbsp; &nbsp; System Admin - <i>ver 1.0.47</i></strong>
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Beyond.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  
</template>

<style>
  .config{
    height: 40px;
    padding: 0;
  }
</style>