//função mostrar animacoes posso passar o tempo como parametro 
const mostrarAnimacoes = (tempo) => {
    setInterval(()=> {
        animateCSS('#apostar', 'flipInX') //botao
        animateCSS('.fa-heartbeat', 'swing') //icone dos erros
        animateCSS('.fa-exclamation-circle', 'bounce') //icone das chances
        animateCSS('.fa-concierge-bell', 'wobble') //icone das tentativas
    },tempo)
}

//1 - Declarar um array de escopo global de erros var erros = []
var erros = []

//2 - Gerar um numero aleatório entre 1 e 60 (criar uma constante com o nome de VALOR_SORTEADO) Math.random()*60+1
const VALOR_SORTEADO = parseInt(Math.random()*60+1)

//3 - Declarar o limite de chances (uma constante CHANCES = 6)
const CHANCES = 6

//4 - Criar uma funcao chamada apostarNumero()
const apostarNumero = () => {
    let n = parseInt(numero.value)
    //4.1 - Verificar se o numero é menor ou igual a zero ou numero > que 60, caso for mostrar "Informe um número válido"
    if(!verificaNumeroInvalido(n)){return} //se for negativa (numero for invalido) o codigo para nesse ponto
    //4.2 - Verificar se o número digitado pelo usuario (a aposta) é igual ao VALOR_SORTEADO, se for mostrar 
    if(!verificaNumeroSorteado(n)){return} //se for negativa (o numero for sorteado) o codigo para nesse ponto
    //4.3 - Caso o valor digitado for diferente do VALOR_SORTEADO
    if(n !== VALOR_SORTEADO){
        //4.3.1 -  Verificar Se o valor digitado ja existe no array de erros, se ja existir mostrar 
        if(!verificarNumeroErroRepetido(n)){return} //se for negativa (o numero for repetido)  o codigo para nesse ponto
        //4.4 - Caso o valor nao exista no array de erros, adicionar o valor ao array erros (usar o push)
        erros.push(n)
        //4.4.1 - criar uma variavel let numErros para guardar a quantidade de erros erros.length
        let numErros = erros.length
        //4.4.2 - criar uma variavel let numChances para guardar o CHANCES - numErros
        let numChances = CHANCES - numErros
        //4.4.3 - mostrar na tela no id=saidaErro o numero de erros e todo o conteudo do array erros.join()
        saidaErro.innerHTML = `<h4 class="alert alert-danger"> <i class="fas fa-angry"></i> ${numErros}  (${erros.join(", ")})</h4>`
        //4.4.4 - mostrar na tela no id=saidaChance o numero de chances que restam
        saidaChance.innerHTML = `<h4 class="alert alert-primary"> <i class="fas fa-grimace"></i> ${numChances}</h4>`
        //4.5 -  Verificar se o numero de chances (numChances) for igual a zero
        verificarFimDoJogoDica(numChances)
    }
    //4.7 -  Sempre que o usuario apostar limpar o campo e apontar o foco para ele
    limparCampo()
}

//4.7 -  Sempre que o usuario apostar limpar o campo e apontar o foco para ele
const limparCampo = () => {
    numero.value = ''
    numero.focus()
}

//4.2.1 - Ocultar o botao apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
//4.5.2 - Ocultar o botao apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
const mostrarOcultarItens = () => {  
    jogar.classList.remove('d-none') //MOSTRA é o botao Jogar Novamente (mostrar)
    apostar.classList.add('d-none') // adicionar a class .d-none o apostar (ocultar)
    boxNumero.classList.add('d-none') // adicionar a class .d-none o boxNumero (ocultar)
    boxErro.classList.add('d-none') // adicionar a class .d-none o boxErro (ocultar)
    boxChance.classList.add('d-none') // adicionar a class .d-none o boxChance (ocultar)
}

//4.5 -  Verificar se o numero de chances (numChances) for igual a zero
const verificarFimDoJogoDica = (numChances) => {
    if(numChances === 0){
        //4.5.1 - mostrar na tela "Suas chances acabaram!"
        alert("Suas chances acabaram! - GAME OVER")
        //4.5.2 - Ocultar o botao apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
        mostrarOcultarItens()
        //4.5.3 - Mostrar no saidaDica "GAME OVER! O número sorteado é VALOR_SORTEADO"
        saidaDica.innerHTML = `<h4 class="alert alert-danger"><i class="fas fa-sad-cry"></i> GAME OVER! O número sorteado é : ${VALOR_SORTEADO}</h4>`
        limparCampo()
        return false
    }else{
        //4.6 - Caso o o numero de chances (numChances) for diferente de zero (MONTAR AS DICAS)
        //4.6.1 - Verificar se o numero digitado é menor que o sorteado, caso sim armazenar um texto
        let dica = numero.value < VALOR_SORTEADO ? "maior" : "menor"
        //4.6.2 - Mostrar na tela no campo saidaDica o Texto " Tente um número ${dica} que o VALOR_SORTEADO"
        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-grin-beam-sweat"></i> Tente um número ${dica} que ${numero.value}</h4>`
    }
}

//4.3.1 -  Verificar Se o valor digitado ja existe no array de erros, se ja existir mostrar 
const verificarNumeroErroRepetido = (n) => {
    if(erros.indexOf(n) !== -1){
        // "Você já apostou o número X. Tente outro!!!"
        alert(`Você já apostou o número ${n} -  Tente outro!!!`)
        limparCampo()
        return false
    }
    return true
}

//4.1 - Verificar se o numero é menor ou igual a zero ou numero > que 60, caso for mostrar "Informe um número válido"
const verificaNumeroInvalido = (n) => {
    if(n <= 0 || n > 60 || isNaN(n)){
    
        Swal.fire({
            title: 'Erro!',
            text: 'Informe um número válido!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        limparCampo() //4.7
        return false
    }
    return true
}

//4.2 - Verificar se o número digitado pelo usuario (a aposta) é igual ao VALOR_SORTEADO, se for mostrar 
const verificaNumeroSorteado = (n) => {
    if(n === VALOR_SORTEADO){
        //4.2.1 - Ocultar o botao apostar e mostrar um botão chamado Jogar Novamente (criar esse botão)
        mostrarOcultarItens()
        //4.2.2 - Mostrar no saidaDica "Parabéns! O número sorteado é: VALOR_SORTEADO"
        saidaDica.innerHTML = `<h4 class="alert alert-success"><i class="fas fa-grin-stars"></i> Parabéns! O número sorteado é: ${VALOR_SORTEADO}</h4>`
        //4.2.3
        //"Parabéns! Você acertou!"
        alert("Parabéns! Você acertou!")
        limparCampo()
        return false
    }
    return true
}

/**
 * ESSE PARTE É ONDE INICIO O CODIGO
 */
mostrarAnimacoes(9500)

//4.2.3 - Se o usuario apertar o botao jogar novamente a acao sera window.location.reload()
jogar.addEventListener('click', () => window.location.reload()) 

//Onde escuto o submit do formulario da tela
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault() //evitar o disparo do formulario (submeter o envio das informacoes)
    apostarNumero() //acionar a funcao apostarNumero
})