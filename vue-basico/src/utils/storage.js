import Usuario from './../models/Usuario';

function salvarUsuarioNaStorage(usuario) {
    let usuarioString = JSON.stringify(usuario);
    localStorage.setItem('usuario', usuarioString)
}

function obterUsuarioNaStorage() {
    let usuarioString = localStorage.getItem('usuario');
    return new Usuario(JSON.parse(usuarioString));
}

function removerUsuarioNaStorage() {
    localStorage.removeItem('usuario')
}

function salvarTokenNaStorage(token) {
    localStorage.setItem('token', token);
}

function obterTokenNaStorage() {
    return localStorage.getItem('token');
}

function removerTokenNaStorage() {
    localStorage.removeItem('token')
}

export default {
    salvarUsuarioNaStorage,
    obterUsuarioNaStorage,
    removerUsuarioNaStorage,
    salvarTokenNaStorage,
    obterTokenNaStorage,
    removerTokenNaStorage
}