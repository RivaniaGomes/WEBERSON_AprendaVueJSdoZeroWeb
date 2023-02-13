<template>
    <div class="box-login">
        <div class="logo">
            <h1>Login</h1>
        </div>
        <InputLogin 
            label="E-mail" 
            placeHolder="exemplo@email.com.br"
            type="email"
        />
        <InputLogin 
            label="Senha"
            placeHolder="Digite sua senha"
            type="password"
        />
        <Button 
            value="Entrar"
            :callback="login"></Button>
    </div>
</template>

<script>
import InputLogin from '../components/input/InputLogin.vue'
import Button from '../components/button/Button'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    components:{
        InputLogin,
        Button,
    },
    data(){
        return{

        }
    },
    methods: {
        login(){
            //criar logica para acessar o sistema
            this.$router.push({path: '/'}) // pode passar pelo name tbm
        }
    }
}
</script>

<style scoped>
    .box-login {
        width: 300px;
        margin: auto;
        border: 1px solid #ddd;
        margin-top: 70px;
        padding: 30px;
    }

    .logo {
        text-align: center;
        color: var(--cor-primaria);
        font-size: 22px;
    }
</style>