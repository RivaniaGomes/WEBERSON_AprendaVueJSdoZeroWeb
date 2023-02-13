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
              <Button value="Adicionar"></Button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
              <table class="table">
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

  export default {
    name: 'ControleDeProdutos',
    components: {
      Button,
    },
    data(){
      return{
       produtos:[]
      }
    },
    methods: {
      obterTodosOsProdutos(){
        produtoService.obterTodos()
        .then(response => {
          this.produtos = response.data.map(p => new Produto(p));
          console.log(this.produtos)
        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    mounted(){
      this.obterTodosOsProdutos();
    }
  }
  </script>
  
  <style scoped>
  h1 {
    color: red;
  }
  
  </style>