<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="titulo">Produtos</h2>
          <hr/>
        </div>
      </div>
        <div class="row sub-container">
          <div class="col-sm-2">
              <Button :callback="adicionarProduto" value="Adicionar"></Button>
          </div>
          <div class="col-sm-10">
            <a @click="verProdutosEmCards" class="float-right ver-em-cards">Ver em cards</a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Data de Cadastro</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in produtos" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.quantidadeEstoque }}</td>
                    <td>{{ item.valor | real }}</td>
                    <td>{{ item.dataCadastro | data}}</td>
                    <td>
                      <i @click="editarProduto(item)" class="fas fa-pencil-alt icones-tabela"></i>
                      <i @click="excluirProduto(item)" class="fas fa-trash-alt icones-tabela"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>

      </div>
  </template>
.
  <script>
  import produtoService from '../services/produto-service';
  import Button from '../components/button/Button';
  import Produto from '@/models/Produto';
  import ConversorDeData from '../utils/conversor-data'
  import ConversorMonetario from '../utils/conversor-monetario'

  export default {
    name: 'ControleDeProdutos',
    components: {
      Button,
    },
    filters: {
      data(data){
        return ConversorDeData.aplicarMascaraEmDataIso(data);
      },
      real(valor) {
        return ConversorMonetario.aplicarMascaraParaRealComPrefixo(valor);
      }
    },
    data(){
      return{
        produtos:[]
      }
    },
    mounted(){
      this.obterTodosOsProdutos();
    },
    methods: {
      verProdutosEmCards(){
        this.$router.push({name: "ListaProdutosCards"});
      },
      adicionarProduto(){
        this.$router.push({name: "NovoProduto"});
      },
      editarProduto(produto){
        this.$router.push({name: "EditarProduto", params: {id: produto.id}});
      },
      excluirProduto(produto){
        this.$swal({
          icon: 'question',
          title: 'Deseja Excluir o produto?',
          text: `Código: ${produto.id} - Nome: ${produto.nome}`,
          showCancelButton: true,
          confirmButtonColor: '#FF3D00',
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
          animate: true
        }).then((result) => {
            if (result.isConfirmed) {
              produtoService
              .deletar(produto.id)
              .then(()=>{
                let indice = this.produtos.findIndex(p => p.id === produto.id);
                this.produtos.splice(indice, 1);
                this.$swal({
                        icon: 'success',
                        title: 'Produto excluido com sucesso!',
                        confirmButtonColor: '#FF3D00',
                        animate: true,
                    });
                //alert("Produto excluido com sucesso")
          })
          .catch(error =>{
            console.log(error);
            this.$swal({
              icon: 'error',
              title: 'Não foi possível excluir o produto!',
              confirmButtonColor: '#FF3D00',
              animate: true,
            });
          });
            }
        });
      },
      ordenarProdutos(a, b) {
        return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0; //escolher o que vai ser ordernado, aquié o id
      },
      obterTodosOsProdutos(){
        produtoService.obterTodos()
        .then(response => {
          let produtos = response.data.map(p => new Produto(p));
          //reverse inverte a ordem do sort, faz o inverso do que está
          this.produtos = produtos.sort(this.OrdenarProdutos).reverse(); //como a api já é ordernada era sõ colocar produtos.reverse()
        })
        .catch(error => {
          console.log(error);
          this.$swal({
              icon: 'error',
              title: 'Não foi possível obter todos os produtos!',
              confirmButtonColor: '#FF3D00',
              animate: true,
            });
        })
      }
    },
  }
  </script>
  
  <style scoped>
    .icones-tabela,
    .ver-em-cards {
      margin: 5px;
      cursor: pointer;
      color: var(--cor-primaria);
    }
  
    .ver-em-cards {
      margin-top: 25px;
    }
  
  </style>