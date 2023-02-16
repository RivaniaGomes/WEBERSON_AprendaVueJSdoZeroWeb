<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="titulo">Cards de produtos</h1>
                <hr>
            </div>
        </div>

        <div class="row mt-3">
            <Card>
                <template v-slot:nome>
                    produto
                </template>

                <template v-slot:valor>
                    200
                </template>

                <template v-slot:observacao>
                    ytttyyy produto
                </template>

                <template v-slot:acoes>
                    <i @click="editarProduto(item)" class="fas fa-pencil-alt icones-tabela"></i>
                    <i @click="excluirProduto(item)" class="fas fa-trash-alt icones-tabela"></i>
                </template>
            </Card>
        </div>

    </div>
</template>

<script>
import Card from '@/components/cards/Card.vue'
export default {
    name: 'ListaProdutosCards',
    components: {
        Card,
    },
    data() {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>