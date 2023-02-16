import produtoService from "../services/produto-service";
import Produto from "@/models/Produto";
import ConversorDeData from "../utils/conversor-data";
import ConversorMonetario from "../utils/conversor-monetario";

let ProdutoMixin = {
    filters: {
        data(data) {
            return ConversorDeData.aplicarMascaraEmDataIso(data);
        },
        real(valor) {
            return ConversorMonetario.aplicarMascaraParaRealComPrefixo(valor);
        },
    },

    data() {
        return {
            produtos: [],
        };
    },

    mounted() {
        this.obterTodosOsProdutos();
    },

    methods: {
        editarProduto(produto) {
            this.$router.push({ name: "EditarProduto", params: { id: produto.id } });
        },

        excluirProduto(produto) {
            this.$swal({
                icon: "question",
                title: "Deseja Excluir o produto?",
                text: `Código: ${produto.id} - Nome: ${produto.nome}`,
                showCancelButton: true,
                confirmButtonColor: "#FF3D00",
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                animate: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    produtoService
                        .deletar(produto.id)
                        .then(() => {
                            let indice = this.produtos.findIndex((p) => p.id === produto.id);
                            this.produtos.splice(indice, 1);
                            this.$swal({
                                icon: "success",
                                title: "Produto excluido com sucesso!",
                                confirmButtonColor: "#FF3D00",
                                animate: true,
                            });
                            //alert("Produto excluido com sucesso")
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$swal({
                                icon: "error",
                                title: "Não foi possível excluir o produto!",
                                confirmButtonColor: "#FF3D00",
                                animate: true,
                            });
                        });
                }
            });
        },

        ordenarProdutos(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; //escolher o que vai ser ordernado, aquié o id
        },

        obterTodosOsProdutos() {
            produtoService
                .obterTodos()
                .then((response) => {
                    let produtos = response.data.map((p) => new Produto(p));
                    //reverse inverte a ordem do sort, faz o inverso do que está
                    this.produtos = produtos.sort(this.OrdenarProdutos).reverse(); //como a api já é ordernada era sõ colocar produtos.reverse()
                })
                .catch((error) => {
                    console.log(error);
                    this.$swal({
                        icon: "error",
                        title: "Não foi possível obter todos os produtos!",
                        confirmButtonColor: "#FF3D00",
                        animate: true,
                    });
                });
        },
    },
};

export default ProdutoMixin;
