<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <MenuTelas v-if="this.$router.currentRoute.name != 'Login'"/>
    <router-view/>
  </div>
</template>
<script>
import MenuTelas from './components/menu/MenuTelas.vue';
export default {
  components: {
    MenuTelas
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Inter:wght@400;700&family=Poppins:wght@300;400;500;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
:root {
  --cor-primaria: #FF3D00;
  --cor-secundaria: #FF6E40;
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
}

.container {
  margin-top: 15px;
}

.titulo {
  font-weight: 600;
  color: #363636;
}

hr {
  margin: 0;
}

.sub-container {
  margin-top: 15px;
}
</style>