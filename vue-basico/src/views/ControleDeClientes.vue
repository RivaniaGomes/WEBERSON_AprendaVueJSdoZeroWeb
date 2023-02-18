<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h2 class="titulo">Clientes</h2>
        <hr />
      </div>
    </div>
    <div class="row sub-container">
      <div class="col-sm-2">
        <Button :callback="adicionarCliente" value="Adicionar"></Button>
      </div>
      <div class="col-sm-10">
        <a @click="verClientesEmCards" class="float-right ver-em-cards"
          >Ver em cards</a
        >
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>CPF / CNPJ</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Usuário</th>
              <th>Data de Cadastro</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in clientes" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.cpfOuCnpj }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.telefone }}</td>
              <td>{{ item.idUsuario }}</td>
              <td>{{ item.dataCadastro | data }}</td>
              <td>
                <i
                  @click="editarProduto(item)"
                  class="fas fa-pencil-alt icones-tabela"
                ></i>
                <i
                  @click="excluirProduto(item)"
                  class="fas fa-trash-alt icones-tabela"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/button/Button";
import ClienteMixin from "@/mixins/cliente-mixin";

export default {
  name: "ControleDeClientes",
  mixins: [ClienteMixin],
  components: {
    Button,
  },
  data() {
    return {};
  },
  methods: {
    verClientesEmCards() {
      this.$router.push({ name: "ListaClientesCards" });
    },
    adicionarCliente() {
      this.$router.push({ name: "NovoCliente" });
    },
  },
};
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
