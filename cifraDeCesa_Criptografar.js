/* Esse progrma Criptografa palavras ou frases em Cifra de Cesa
 * Autor: Luiz Carlos
 */
 

// Variaveis e Constantes
const input = require('readline-sync')
const alfabeto = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let novoAlfabeto = alfabeto.slice()
let stringCriptografado = "" 
let continuar = null
let posicao = null
let stringNormal = ""


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
    stringNormal = ""
}

function criptografarString(){
    stringCriptografado = ""
    for (i in stringNormal) {
        if (stringNormal[i] == " "){
            stringCriptografado += " "
        } else {
            stringCriptografado += novoAlfabeto[alfabeto.indexOf(stringNormal[i])]
        }
    } 
    return stringCriptografado
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
    console.log("       Criptografar em Cifra de Cesa       ")
    console.log("-------------------------------------------")
}

function inputs(){
    posicao = input.question('Digite a posição da cifra de cesa [0-24/all] ').split(' ') || 0 // Posição para criar novo alfabeeto
    analisarString(posicao, "posicao")
    stringNormal = input.question('Digite a palavra ou frase\npara ser criptografada: ').toLowerCase().split('') // String para ser critografada
    analisarString(stringNormal, "stringNormal")
}

function analisarString(string, variavel){
    let erro = null
    if (variavel == 'posicao') {
        if (isNumber(string[0]) == true){
            string.forEach(element => {
                if(isNumber(element) == false) {
                    console.log(`Valor inaceitavel: ${element}`)
                    posicao = input.question('Digite novamente [0-24/all] ').split(' ')
                    analisarString(posicao, "posicao")
                } else if ( (element < 0) || (element > 24) ) {
                    console.log(`Valor inaceitavel: ${element}`)
                    posicao = input.question('Digite novamente [0-24/all] ').split(' ')
                    analisarString(posicao, "posicao") 
                } 
            })
        } else if (string[0].toLowerCase() != "all"){
        console.log(`Valor inaceitavel: ${string[0]}`)
        posicao = input.question('Digite novamente [0-24/all] ').split(' ')
        analisarString(posicao, "posicao")
        }
    } else if (variavel == 'stringNormal'){
        string.forEach(element => {
            if (element == " ") {

            } else if ( alfabeto.includes(element) == false){
                erro = true
            }  
        }) 
        if(erro == true){
            console.log('Não pode conter acentos, caracteres ou números')
            stringNormal = input.question('Digite novamente: ').toLocaleLowerCase().split('')
            analisarString(stringNormal, "stringNormal")
        }       
    }
}

// Inicio
do{
    
    menu()
    inputs()

    if (posicao == 'all'){
        console.log('Criptografado: ')
        for(let posicao=0;posicao<=24;posicao++){
            criarNovoAlfabeto(posicao)
            stringCriptografado = criptografarString()
            console.log(`${posicao}.${stringCriptografado}`)
        }
    } else {
        console.log('Criptografado:')
        posicao.forEach(element => {
            criarNovoAlfabeto(element)
            stringCriptografado = criptografarString()
            console.log(`${element}.${stringCriptografado}`)
        })
    }
    
    zerarVariaveis()
    continuar = input.question('Continuar [S/n] ').toLowerCase() || 's'
} while (continuar != 'n')
