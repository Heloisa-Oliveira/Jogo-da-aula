function reconhecer_numero(){
    var numero = document.getElementById("meu_input").value;
    var resposta = ""

    if(numero == ""){
        resposta = "Por favor insira um número inteiro de 0 a 1000";
        document.getElementById("resultado").innerHTML = resposta;
        return false
    }

    for(i=0; i<numero.length; i++){
        if(
            (numero[i] !== "0") &&
            (numero[i] !== "1") &&
            (numero[i] !== "2") &&
            (numero[i] !== "3") &&
            (numero[i] !== "4") &&
            (numero[i] !== "5") &&
            (numero[i] !== "6") &&
            (numero[i] !== "7") &&
            (numero[i] !== "8") &&
            (numero[i] !== "9") 
            ){
                resposta = "Por favor insira um número inteiro de 0 a 1000";
                document.getElementById("resultado").innerHTML = resposta;
                return false
            } 
        }

        if((parseInt(numero) > 1000) || (parseInt(numero) < 0)){
            resposta = "Por favor insira um número inteiro de 0 a 1000";
            document.getElementById("resultado").innerHTML = resposta;
            return false
        }

    resposta = "Obrigadix por escolher um número"
    document.getElementById("resultado").innerHTML = resposta;
    document.getElementById("escolher_numero").setAttribute("type", "submit");

    var data = {
        meu_input: numero
    };

    fetch('/inserir-numero', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
        console.log('Dados enviados com sucesso para o banco de dados.');
        // Realizar ações adicionais após o envio dos dados
        } else {
        console.log('Ocorreu um erro ao enviar os dados para o banco de dados.');
        }
    })
    .catch(function(error) {
        console.log('Erro:', error);
    });

    return true
}

document.getElementById('escolher_numero').addEventListener('click', function(event){
    event.preventDefault();
});


// function testar(){
//     var id = document.getElementById('numero_id').value;
//     var answer = document.getElementById('numero_tentado').value;

//     if()
// }