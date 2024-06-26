const express = require('express');

const aplicacao = express();

aplicacao.get('/', (req, res) => {
    res.send("Meu backende está funcionando");
});

aplicacao.post('/', (req, res) => {
    res.send("Meu backend funcionando com método POST!")
});

aplicacao.get('/moedas', (req, res) => {
    let moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "eiro"
    }
});

aplicacao.listen(4000, () => {
    console.log("Estou escutando a porta 4000");
});