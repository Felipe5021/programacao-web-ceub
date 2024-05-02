let valoresConversao = {
    real: {
        dolar: 5.03,
        euro: 5.47
    },
    dolar: {
        real: 0.27,
        euro: 0.97
   },
   euro: {
        real: 5.47,
        dolar: 0.92
   }
}


let botaoConverter = document.getElementById("botao-converter");
botaoConverter.addEventListener("click", converter);

let botaoLimpar = document.getElementById("botao-limpar");
botaoLimpar.addEventListener("click", limpar);

let botaoInverter = document.getElementById("botao-inverter");
botaoInverter.addEventListener("click", inverter);

let botaoAceitaUsuario = document.getElementById("botao-aceita-mensagem");
botaoAceitaUsuario.addEventListener("click", aceitaMensagem);

if(localStorage.getItem("aceitouCookie") =="1") {
    aceitaMensagem();
}

function salvaResultadoNoHistorico(conversao) {
    let historico = recuperarHistoricoDeConversoes();

    historico.push(conversao);

    historico = JSON.stringify(historico);
    localStorage.setItem("historico", historico);
}

function recuperarHistoricoDeConversoes() {
    let historico = localStorage.getItem("historico");

    if(!historico) {
        return[];
    }

    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
}



function aceitaMensagem() {
    let divMensagemUsuario = document.getElementById("container-mensagem-usuario");
    divMensagemUsuario.classList.add("oculto");

    localStorage.setItem("aceitouCookie", "1");
}

let valorUsuario = document.getElementById("valor-usuario");
valorUsuario.addEventListener("keypress", function(event) {

    console.log(event);

    if(event.key == "Enter") {
        converter();
    }

    if(event.ctrlKey == true && event.code == KeyI){
        inverter();
    }
    if(event.ctrlKey == true && event.code == KeyL){
        limpar();
    }

});


function limpar() {
    let valorUsuario = document.getElementById("valor-usuario");
    let resultado = document.getElementById("resultado");

    valorUsuario.value = "";
    resultado.textContent = "";
}

function buscaAPI() {
    let parametro = moedaOrigem + "-" + moedaDestino;
    let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"+ parametro;

    console.log(url);

    return fetch(url).then(function(data){
        if(data.status == 200) {
            console.log("Retorno código 200 API!");
        }
        return data.json();
    }).then(function(response){
        let objetoEmJson = JSON.stringify(response);

        console.log(objetoEmJson);

        console.log(response["USDBRL"]["ask"]);
        return response["USDBRL"]["ask"];
    }).catch();

}

function converter() {

    let valorUsuario = document.getElementById("valor-usuario").value;

    let moedaOrigem = document.getElementById("moeda1").value;
    let moedaDestino = document.getElementById("moeda2").value;

    buscaAPI(moedaOrigem, moedaDestino).then(function(data){
        let conversao = valorUsuario * data["ask"];

    let simbolo = "";
    if (moedaDestino == "real") {
        simbolo = "R$";
    }
    if (moedaDestino == "dolar") {
        simbolo = "US$";
    }

    if (moedaDestino == "dolar") {
        simbolo = "€";
    }

    let resultado = document.getElementById("resultado");
    resultado.textContent = simbolo + " " + conversao.toFixed(2);

    let resultadoDaConversao = {
        valor: valorUsuario,
        moeda1: moedaOrigem,
        moeda2: moedaDestino,
        resultado: conversao
    }
    

});


    let paragrafoResultado = document.getElementById("resultado");
    paragrafoResultado.textContent = simbolo + conversao.toFixed(2);

    let resultadoDaConversao = {
        valor: valorUsuario,
        moeda1: moedaOrigem,
        moeda2: moedaDestino,
        resultado: conversao
    }

    salvaResultadoNoHistorico(resultadoDaConversao);

}

function inverter() {
    let moeda1 = document.getElementById("moeda1").value;
    let moeda2 = document.getElementById("moeda2").value;


    document.getElementById("moeda1").value = moeda2;
    document.getElementById("moeda2").value = moeda1;

    //console.log(moeda1);
    //console.log(moeda2);
}