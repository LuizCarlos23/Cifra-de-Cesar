/* Esse progrma Descriptografa palavras ou frases em Cifra de Cesa
 * Autor: Luiz Carlos
 */
 

// Variaveis e Constantes
const input = require('readline-sync')
const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let novoAlfabeto = alfabeto.slice()
let stringCriptografado = "" 
let continuar = null
let posicao = null
let stringDescriptografada = ""

// Funções
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function zerarVariaveis(){
    novoAlfabeto = null
    novoAlfabeto = alfabeto.slice()
    stringCriptografado = ""
    continuar = null
    posicao = null
    stringDescriptografada = ""
}

function descriptografarString(){
    stringDescriptografada = ""
    for (i in stringCriptografado) {
        if (stringCriptografado[i] == " "){
            stringDescriptografada += " "
        } else {
            stringDescriptografada += alfabeto[novoAlfabeto.indexOf(stringCriptografado[i])]
        }
    } 
    return stringDescriptografada
}

function criarNovoAlfabeto(posicao) { 
    novoAlfabeto = alfabeto.slice() // Zerar o novo alfabeto
    for (let i=0; i<=posicao; i++){
        novoAlfabeto.unshift(novoAlfabeto[25])
        novoAlfabeto.splice(-1, 1)
    }
}

function menu(){
    console.log("-------------------------------------------")
    console.log("       Descriptografar Cifra de Cesa       ")
    console.log("-------------------------------------------")
}

function inputs(){
    posicao = input.question('Digite a posição da cifra de cesa [0-24/all] ') || 0 // Posição para criar novo alfabeeto
    analisarString(posicao, "posicao")
    stringCriptografado = input.question('Digite a palavra ou frase\npara ser descriptografada: ').toLowerCase().split('') // String para ser critografada
    analisarString(stringCriptografado, "stringCriptografado")
}

function analisarString(string, variavel){
    let erro = null
    if (variavel == 'posicao') {
        if (isNumber(string) == true){
            if ( (string < 0) || (string > 24) ) {
                console.log("Valor inaceitavel")
                posicao = input.question('Digite novamente [0-24/all] ')
                analisarString(posicao, "posicao")
            } 
        } else if (string.toLowerCase() != "all"){
            console.log("valor inaceitavel")
            posicao = input.question('Digite novamente [0-24/all] ')
            analisarString(posicao, "posicao")
        }
    } else if (variavel == 'stringCriptografado'){
        string.forEach(element => {
            if (element == " ") {

            } else if ( alfabeto.includes(element) == false){
                erro = true
            }  
        }); 
        if(erro == true){
            console.log('Não pode conter acentos, caracteres ou números')
            stringCriptografado = input.question('Digite novamente: ').toLocaleLowerCase().split('')
            analisarString(stringCriptografado, "stringCriptografado")
        }       
    }
}

// Inicio
do{
    
    menu()
    inputs()

    if (posicao == 'all'){
        console.log('Descriptografado: ')
        for(let posicao=0;posicao<=24;posicao++){
            criarNovoAlfabeto(posicao)
            stringDescriptografada = descriptografarString()
            console.log(`${posicao}.${stringDescriptografada}`)
        }
    } else {
        criarNovoAlfabeto(posicao)
        stringDescriptografada = descriptografarString()
        console.log(`Descriptografado: ${stringDescriptografada}`)
    }
    
    zerarVariaveis()
    continuar = input.question('Continuar [S/n] ').toLowerCase() || 's'
} while (continuar != 'n')
