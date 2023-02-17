<template>
    <div class="box-login">
        <div class="logo">
            <h1>Login</h1>
        </div>
        <InputLogin label="E-mail" placeHolder="Digite seu email" type="email" v-model="usuario.email" />
        <InputLogin label="Senha" placeHolder="email@exemplo.com" type="password" v-model="usuario.senha" />
        <Button value="Entrar" :callback="login"></Button>
    </div>
</template>

<script>
import InputLogin from '../components/input/InputLogin.vue';
import Button from '../components/button/Button';
import Usuario from '@/models/Usuario';
import usuarioService from '@/services/usuario-service';
import utilStorage from '@/utils/storage';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    components: {
        InputLogin,
        Button,
    },
    data() {
        return {
            usuario: new Usuario()
        }
    },
    methods: {
        login() {

            if (!this.usuario.modeloValidoLogin()) {
                this.$swal({
                    icon: 'warning',
                    title: 'O email e senha são obrigatório!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                return;
            }
            usuarioService
                .login(this.usuario.email, this.usuario.senha)
                .then(response => {
                    this.usuario = new Usuario(response.data.usuario);

                    utilStorage.salvarUsuarioNaStorage(this.usuario);
                    utilStorage.salvarTokenNaStorage(response.data.token);
                    
                    this.$router.push({ name: 'ControleDeProdutos' });
                })
                .catch(error => {
                    if (error.name !== "NavigationDuplicated") {
                        this.$swal({
                            icon: 'warning',
                            title: 'O email ou senha inválido!',
                            confirmButtonColor: '#FF3D00',
                            animate: true,
                        });
                        throw error;
                    }
                })
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