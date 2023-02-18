<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Cliente</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-group">
                    <label for="id">Código</label>
                    <input id="id" v-model="cliente.id" type="text" disabled class="form-control">
                </div>
            </div>

            <div class="col-sm-10">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" v-model="cliente.nome" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="quantidade">cpfOuCnpj</label>
                    <input id="quantidade" v-model="cliente.cpfOuCnpj" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="valor">Telefone</label>
                    <input id="valor" v-model="cliente.valor" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="data-cadastro">Data cadastro</label>
                    <input id="data-cadastro" v-model="cliente.dataCadastro" type="date" class="form-control">
                </div>
            </div>

            <div class="col-sm-12">
                <div class="form-group">
                    <label for="observacao">E-mail</label>
                    <textarea id="observacao" v-model="cliente.email" type="text" class="form-control" rows="4"></textarea>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <hr>
            </div>

            <div class="col-sm-12">
                <div v-show="modoCadastro" class="form-check-inline">
                    <label for="" class="form-check-label">
                        <input v-model="continuarAdicionando" type="checkbox" class="form-check-input">
                        Continuar adicionando
                    </label>
                </div>
                <button @click="cancelarAcao" class="btn btn-default float-right">Cancelar</button>
                <button @click="salvarProduto" class="btn btn-primary float-right mr-2">Salvar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Cliente from '@/models/Cliente'
import clienteService from '@/services/cliente-service'
import conversorData from '@/utils/conversor-data'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Cliente',
    data(){
        return {
            cliente: new Cliente(),
            modoCadastro: true,
            continuarAdicionando: false,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.modoCadastro = false;
        this.obterClientePorId(id);
    },
    methods: {
        obterClientePorId(id){
            clienteService.obterPorId(id)
            .then(response => {
                this.cliente = new Cliente(response.data)
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                    icon: 'error',
                    title: 'Não foi possível obter o cliente pelo id ' + id,
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
            })
        },
        cancelarAcao(){
            this.cliente = new Cliente();
            this.$router.push({name: "ControleDeClientes"})
        },
        CadastrarCliente(){
            if(!this.prodclienteuto.modeloValidoParaCadastro()){
                this.$swal({
                    icon: 'warning',
                    title: 'O nome do cliente é obrigatório para o cadastro!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                //alert('O nome do cliente é obrigatório para o cadastro');
                return;
            }

            this.cliente.dataCadastro = conversorData.aplicarMascaraISOEmFormatoAmericano(this.cliente.dataCadastro);

            clienteService.cadastrar(this.cliente)
            .then(() => {
                this.$swal({
                    icon: 'success',
                    title: 'Cliente cadastrado com sucesso!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                //alert('Cliente cadastrado com sucesso!');
                this.cliente = new Cliente();

                if(!this.continuarAdicionando){
                    this.$router.push({name: "ControleDeClientes"})
                }
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                    icon: 'error',
                    title: 'Não foi possível cadastrar o cliente!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
            });
        },
        atualizarCliente(){
            if(!this.cliente.modeloValidoParaAtualizar()){
                this.$swal({
                    icon: 'warning',
                    title: 'O nome do cliente é obrigatório para o cadastro!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                //alert('O nome do cliente é obrigatório para o cadastro');
                return;
            }

            this.cliente.dataCadastro = conversorData.aplicarMascaraISOEmFormatoAmericano(this.cliente.dataCadastro);

            clienteService.atualizar(this.cliente)
            .then(()=> {
                this.$swal({
                    icon: 'success',
                    title: 'Cliente atualizado com sucesso!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
                //alert('Cliente atualizado com sucesso!');
                this.$router.push({name: "ControleDeClientes"})
            })
            .catch(error => {
                console.log(error);
                this.$swal({
                    icon: 'error',
                    title: 'Não foi possível atualizar o cliente!',
                    confirmButtonColor: '#FF3D00',
                    animate: true,
                });
            })
        },
        salvarCliente(){
            (this.modoCadastro) ? this.CadastrarCliente() : this.atualizarCliente();
        },
        
    }
}
</script>

<style scoped>
    textarea{
        resize: none;
    }
</style>