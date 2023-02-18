import api from './api';

function obterTodos() {
    return new Promise((resolve, reject)=> {
        return api.get('/clientes')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id) {
    return new Promise((resolve, reject)=> {
        return api.get(`/clientes/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(cliente) {
    return new Promise((resolve, reject)=> {
        return api.post(`/clientes`, cliente)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(cliente) {
    return new Promise((resolve, reject)=> {
        return api.put(`/clientes/${cliente.id}`, cliente)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id) {
    return new Promise((resolve, reject)=> {
        return api.delete(`/clientes/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}