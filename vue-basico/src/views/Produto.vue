<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">{{ modoCadastro ? "Adicionar" : "Editar" }} Produto</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <div class="form-group">
                    <label for="id">Código</label>
                    <input id="id" v-model="produto.id" type="text" disabled class="form-control">
                </div>
            </div>

            <div class="col-sm-10">
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input id="nome" v-model="produto.nome" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="quantidade">Quantidade</label>
                    <input id="quantidade" v-model="produto.quantidadeEstoque" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="valor">Valor</label>
                    <input id="valor" v-model="produto.valor" type="text" class="form-control">
                </div>
            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    <label for="data-cadastro">Data cadastro</label>
                    <input id="data-cadastro" v-model="produto.dataCadastro" type="date" class="form-control">
                </div>
            </div>

            <div class="col-sm-12">
                <div class="form-group">
                    <label for="observacao">Observação</label>
                    <textarea id="observacao" v-model="produto.observacao   " type="text" class="form-control" rows="4"></textarea>
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
import Produto from '@/models/Produto'
import produtoService from '@/services/produto-service'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Produto',
    data(){
        return {
            produto: new Produto(),
            modoCadastro: true,
            continuarAdicionando: false,
        }
    },
    mounted(){
        let id = this.$route.params.id;
        if(!id) return;

        this.modoCadastro = false;
        this.obterProdutoPorId(id);
    },
    methods: {
        obterProdutoPorId(id){
            produtoService.obterPorId(id)
            .then(response => {
                this.produto = new Produto(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        cancelarAcao(){
            this.produto = new Produto();
            this.$router.push({name: "ControleDeProdutos"})
        },
        CadastrarProduto(){
            if(!this.produto.modeloValidoParaCadastro()){
                alert('O nome do produto é obrigatório para o cadastro');
                return;
            }

            produtoService.cadastrar(this.produto)
            .then(() => {
                alert('Produto cadastrado com sucesso!');
                this.produto = new Produto();

                if(!this.continuarAdicionando){
                    this.$router.push({name: "ControleDeProdutos"})
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        atualizarProduto(){
            
        },
        salvarProduto(){
            (this.modoCadastro) ? this.CadastrarProduto() : this.atualizarProduto();
        },
        
    }
}
</script>

<style scoped>
    textarea{
        resize: none;
    }
</style>