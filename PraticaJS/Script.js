//Soma
function somar() {
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    var resultado = n1 + n2;

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").value = "Preencha os dois números!";
        return;
    }

    document.getElementById("resultado").value = + resultado;
}
//Subtração
function subtrair() {
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    var resultado = n1 - n2;

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").value = "Preencha os dois números!";
        return;
    }

    document.getElementById("resultado").value = + resultado;
}
//Multiplicação
function multiplicar() {
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    var resultado = n1 * n2;

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").value = "Preencha os dois números!";
        return;
    }

    document.getElementById("resultado").value = + resultado;
}
//Divisão
function dividir() {
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("resultado").value = "Preencha os dois números!";
        return;
    } if (n2 == 0) {
        alert("O denominador não pode ser zero!");
    } else {
        var resultado = n1 / n2;
        document.getElementById("resultado").value = + resultado;
    }
}
//Fatorial
function fatorial() {
    var num = parseInt(document.getElementById("fat").value);
    var resultado = 1;

    if (num < 0) {
        alert("Não existe fatorial de número negativo!");
    } if (isNaN(num) || num == 0) { // Verifica se o usuário digitou um número válido ;)
        document.getElementById("resultadoFat").value = "Preencha com um número inteiro positivo!";
        return;
    } else {
        for (var i = 1; i <= num; i++) {
            resultado = resultado * i;
        }

        document.getElementById("resultadoFat").value = + resultado;
    }
}
