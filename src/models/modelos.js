class Projeto {
    constructor(id, nome, tecnologia, inicio, fim){
        this.id = id;
        this.nome = nome;
        this.tecnologia = tecnologia;
        this.inicio = inicio;
        this.fim = fim;
    }
}

module.exports = {
    Projeto: Projeto
}  
