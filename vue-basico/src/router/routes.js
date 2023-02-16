import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ControleDeClientes from '@/views/ControleDeClientes.vue';
import ControleDeProdutos from '@/views/ControleDeProdutos.vue';
import ListaProdutosCards from '@/views/ListaProdutosCards.vue';
import Produto from '@/views/Produto.vue';

//@ é um alias para a pasta src

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      title: 'Login',
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      title: 'Dashboard',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/controle-de-produtos',
      name: 'ControleDeProdutos',
      component: ControleDeProdutos,
      title: 'Produtos',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/controle-de-produtos/novo',
      name: 'NovoProduto',
      component: Produto,
      title: 'Adicionar produtos',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/controle-de-produtos/lista-cards',
      name: 'ListaProdutosCards',
      component: ListaProdutosCards,
      title: 'Lista de produtos em cards',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/controle-de-produtos/editar',
      name: 'EditarProduto',
      component: Produto,
      title: 'Editar produtos',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/controle-de-clientes',
      name: 'ControleDeClientes',
      component: ControleDeClientes,
      title: 'Clientes',
      meta: {
        requiredAuth: true
      }
    },
  ];

  export default routes