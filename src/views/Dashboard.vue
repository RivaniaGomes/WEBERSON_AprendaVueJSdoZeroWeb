<template>
  <div>
    <h1>{{mensagem}}</h1>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  data(){
    return{
     mensagem: 'Estou na tela dashboard' 
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>