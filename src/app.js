/*
Exemplo simples de projeto com uma estrutura
de diretórios organizada.
Autor: Sarah
*/


/* importando o express */
const express = require('express');
const axios = require('axios');
const app = express();
const port = 5005;

const servicoPersistenciaBaseURL = 'http://localhost:5004';

/* importando o modelo */
const modelo = require('./models/modelos');
var Projeto = modelo.Projeto; //Vinculação de tipo

async function listProjects() {
    const projetos = [];
    const response = await axios.get(`${servicoPersistenciaBaseURL}/projetos`);
    response.data.forEach(projeto => {
       projetos.push(new Projeto(projeto.id, projeto.nome, projeto.linguagem, projeto.anoInicio, projeto.anoFim));
    })
    return projetos;
}

/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './views');

/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('public'));

app.get('/', adminHandler);

async function adminHandler(_, res){
    res.render('admin.ejs', {lista_projetos: await listProjects()});    
}

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

