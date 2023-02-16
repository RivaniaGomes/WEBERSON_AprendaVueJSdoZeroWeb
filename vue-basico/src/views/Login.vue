<template>
    <div class="box-login">
        <div class="logo">
            <h1>Login</h1>
        </div>
        <InputLogin 
            label="E-mail" 
            placeHolder="exemplo@email.com.br"
            type="email"
            v-model="usuario.email"
        />
        <InputLogin 
            label="Senha"
            placeHolder="Digite sua senha"
            type="password"
            v-model="usuario.senha"
        />
        <Button 
            value="Entrar"
            :callback="login"></Button>
    </div>
</template>

<script>
import InputLogin from '../components/input/InputLogin.vue'
import Button from '../components/button/Button'
import Usuario from '@/models/Usuario'
import usuarioService from '@/services/usuario-service'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    components:{
        InputLogin,
        Button,
    },
    data(){
        return{
            usuario: new Usuario()
        }
    },
    methods: {
        login(){

            if (!this.usuario.modeloValidoLogin()) {
                this.$swal({
                    icon: 'warning',
                    title: 'O email e senha são obrigatório!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                return;
            }
            usuarioService.login(this.usuario.email, this.usuario.senha)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            //criar logica para acessar o sistema
            //awui enviaria os dados de login pra api
            //se tudo ok segue para tela de controle de produtos
            //caso contrario, mensagem de acesso invalido, dados invalidos
            this.$router.push({path: '/controle-de-produtos'}) // pode passar pelo name tbm
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