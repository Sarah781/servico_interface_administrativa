'use strict'

const servicoPersistenciaBaseURL = 'http://localhost:5004';

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

let projetoSelecionado = undefined;

function excluirProjeto(id) {
    fetch(`${servicoPersistenciaBaseURL}/projetos/${id}`, {
        method: 'DELETE'
    }).then(() => {
        window.location.reload();
    });
}

function criarProjeto() {
    const id = !!projetoSelecionado ? projetoSelecionado.id : undefined
    const nome = document.getElementById('form-nome').value;
    const linguagem = document.getElementById('form-linguagem').value;
    const anoInicio = document.getElementById('form-inicio').value;
    const anoFim = document.getElementById('form-fim').value;

    fetch(`${servicoPersistenciaBaseURL}/projetos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, nome, linguagem, anoInicio, anoFim})
    }).then(() => {
        window.location.reload();
    });

    projetoSelecionado = undefined;
}

function editarProjeto(projeto) {
    projetoSelecionado = JSON.parse(decodeURIComponent(projeto));
    
    document.getElementById('form-nome').value = projetoSelecionado.nome;
    document.getElementById('form-linguagem').value = projetoSelecionado.tecnologia;
    document.getElementById('form-inicio').value = projetoSelecionado.inicio;
    document.getElementById('form-fim').value = projetoSelecionado.fim;

    openModal();
}
