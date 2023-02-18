<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">Cards de clientes</h1>
                <hr />
            </div>
        </div>
        <div class="row mt-3">
            <div v-for="cliente in clientes" :key="cliente.id">
                <Card>
                    <template v-slot:nome>{{ cliente.nome }} </template>
                    <template v-slot:valor>
                        {{ cliente.valor | real }}
                    </template>
                    <template v-slot:observacao>
                        {{ cliente.observacao }}
                    </template>
                    <template v-slot:acoes>
                        <i @click="editarCliente(cliente)" class="fas fa-pencil-alt icones-tabela"></i>
                        <i @click="excluirCliente(cliente)" class="fas fa-trash-alt icones-tabela"></i>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "@/components/cards/Card.vue";
import ClienteMixin from "@/mixins/cliente-mixin";
export default {
    name: "ListaProdutosCards",
    mixins: [ClienteMixin],
    components: {
        Card,
    },
    data() {
        return {};
    },
    methods: {
        trocarImagem(cliente) {
            console.log(cliente);
        },
    },
};
</script>

<style scoped></style>
