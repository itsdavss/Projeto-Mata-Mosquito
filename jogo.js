
//----------------------------Variáveis----------------------------

var altura = 0
var largura = 0
var vidas = 1
var tempo = 60

//----------------------------definindo o nível do jogo----------------------------

var criaMosquitoTempo = 1500

//aqui nós recuperamos o nível selecionado pelo usuário através do url
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal'){
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil'){
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris'){
    criaMosquitoTempo = 750
}

//----------------------------Ajustando o tamanho "jogável"----------------------------

function ajustaTamanhoPalcoJogo(){

    //as variaveis recebem a altura e largura atual da janela
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//Criando o cronometro do jogo
var cronometro = setInterval(function() {

    tempo -= 1

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {

    }
    document.getElementById('cronometro').innerHTML = tempo
}, 1000)

//----------------------------Função para ajustar a posição do mosquito----------------------------

//a cada 1000 milésimos (ou 1 segundo) essa função será ativada
function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    //a condição retorna 'true' se já existir um ID chamado "mosquito"
    //se não houver ela retorna 'null' e pula o bloco de código
    if (document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'

            vidas++
        }
        
    }

    //math.floor = arredondar o  número 
    //math.random * altura/largura é pra gerar a posição aleatória
    //-90 é pra imagem não sair da tela
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //se a posicao for abaixo de 0, ela recebe 0. Se não ela recebe ela mesmo
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }
    
    document.body.appendChild(mosquito)

}

//----------------------------Função para definir o tamanho do mosquito----------------------------

//definir o tamanho do mosquito
function tamanhoAleatorio(){ 

    //math.random * 3 é para definir um numero entre 0 e 2 
    //(Math.random nos dá um numero entre 0 e 1)
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0: 
            return 'mosquito1'
        case 1: 
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//----------------------------Função para definir o lado do mosquito----------------------------

//definir o lado do mosquito
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0: 
            return 'ladoA'
        case 1: 
            return 'ladoB'
    }
}