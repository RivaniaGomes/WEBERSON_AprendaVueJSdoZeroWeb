import clienteService from "../services/cliente-service";
import Cliente from "@/models/Cliente";
import ConversorDeData from "../utils/conversor-data";
import ConversorMonetario from "../utils/conversor-monetario";

let ClienteMixin = {
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
            clientes: [],
        };
    },

    mounted() {
        this.obterTodosOsClientes();
    },

    methods: {
        editarCliente(cliente) {
            this.$router.push({ name: "EditarCliente", params: { id: cliente.id } });
        },

        excluirCliente(cliente) {
            this.$swal({
                icon: "question",
                title: "Deseja Excluir o cliente?",
                text: `Código: ${cliente.id} - Nome: ${cliente.nome}`,
                showCancelButton: true,
                confirmButtonColor: "#FF3D00",
                confirmButtonText: "Sim",
                cancelButtonText: "Não",
                animate: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteService
                        .deletar(cliente.id)
                        .then(() => {
                            let indice = this.clientes.findIndex((c) => c.id === cliente.id);
                            this.clientes.splice(indice, 1);
                            this.$swal({
                                icon: "success",
                                title: "Cliente excluido com sucesso!",
                                confirmButtonColor: "#FF3D00",
                                animate: true,
                            });
                            //alert("Cliente excluido com sucesso")
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$swal({
                                icon: "error",
                                title: "Não foi possível excluir o cliente!",
                                confirmButtonColor: "#FF3D00",
                                animate: true,
                            });
                        });
                }
            });
        },

        ordenarClientes(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; //escolher o que vai ser ordernado, aquié o id
        },

        obterTodosOsClientes() {
            clienteService
                .obterTodos()
                .then((response) => {
                    let clientes = response.data.map((c) => new Cliente(c));
                    //reverse inverte a ordem do sort, faz o inverso do que está
                    this.clientes = clientes.sort(this.OrdenarClientes).reverse(); //como a api já é ordernada era sõ colocar clientes.reverse()
                })
                .catch((error) => {
                    console.log(error);
                    this.$swal({
                        icon: "error",
                        title: "Não foi possível obter todos os clientes!",
                        confirmButtonColor: "#FF3D00",
                        animate: true,
                    });
                });
        },
    },
};

export default ClienteMixin;
