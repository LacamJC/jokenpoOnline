/*
        Modulos que uso 

 * npm install express 

 * npm install ejs 

 * npm install sequelize

 * npm install mysql2

*/

var express = require("express")// Criar o objeto modulo express

var aplicacao = express() // Executar o express

const rotas = require('./routes/router') // Fazer include do modulo router


// Criar o objeto bodyParser para ler os dados do formulario
const bodyParser = require('body-parser')


/*
express.json() analisa os dados do formulario que  ficam no corpo de solicitação (POST),
também chamado de request de entrada, para ser enviado ao servidor web
 */
aplicacao.use(express.json())

/* utiliza o objeto rotas que define os caminhos das páginas*/
aplicacao.use('/', rotas)

/* bodyParser serve para trabalhar com os dados vindo do formulario, ou seja, ele transforma
e formata esse pacote de dados para o formato de objeto Javacript
 */
aplicacao.use(bodyParser.urlencoded({extended:false}))

/* include (utilizar) um arquivo externo */
aplicacao.use(express.static(__dirname +'/public'))

/* desmontrar que será utilizado o objeto ejs para interpretarvo template HTML no servidor web */
aplicacao.set('view engine', 'ejs')


const resultado = 
{
    jogadorUm : false, 
    jogadorDois : false,


    jogadorUmJogada : "",
    jogadorDoisJogada : ""
}

function verificar(req, res)
{
    if(resultado.jogadorUm === true && resultado.jogadorDois === true)
        {
            var jogadorUm = resultado.jogadorUmJogada.toUpperCase();
            var jogadorDois = resultado.jogadorDoisJogada.toUpperCase();

            var status_jogadorUm;
            var status_jogadorDois;

            var jogadas = [resultado.jogadorUmJogada, resultado.jogadorDoisJogada]

            console.log(`Jogador 1 : ${jogadorUm} \nJogador 2 : ${jogadorDois}`)

            if(jogadorUm == jogadorDois)
            {
                console.log("EMPATE")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)
                ganhador = "Empate"

                status_jogadorUm = "Empate"
                status_jogadorDois = "Empate"
            }
            
            // VITORIAS DO jogadorUm
            else if(jogadorUm == "PEDRA" && jogadorDois == "TESOURA")
            {
                console.log("jogadorUm VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)

                ganhador = "jogadorUm"
                status_jogadorUm = "Vencedor"
                status_jogadorDois = "Perdedor"
            }else 

            if(jogadorUm == "TESOURA" && jogadorDois == "PAPEL")
            {
                console.log("jogadorUm VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)
                ganhador = "jogadorUm"
                status_jogadorUm = "Vencedor"
                status_jogadorDois = "Perdedor"
            }else 
            if(jogadorUm == "PAPEL" && jogadorDois == "PEDRA")
            {
                console.log("jogadorUm VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)
                ganhador = "jogadorUm"
                status_jogadorUm = "Vencedor"
                status_jogadorDois = "Perdedor"
            }


            
            // VITORIAS DO jogadorDois
            else 
            if(jogadorUm == "PAPEL" && jogadorDois == "TESOURA")
            {
                console.log("jogadorDois VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)

                ganhador = "jogadorDois"
                status_jogadorUm = "Perdedor"
                status_jogadorDois = "Vencedor"
            }
            if(jogadorUm == "TESOURA" && jogadorDois == "PEDRA")
            {
                console.log("jogadorDois VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)
                ganhador = "jogadorDois"
                status_jogadorUm = "Perdedor"
                status_jogadorDois = "Vencedor"
            }else 
            if(jogadorUm == "PEDRA" && jogadorDois == "PAPEL")
            {
                console.log("jogadorDois VENCEU")
                console.log(`jogadorUm : ${jogadorUm}`)
                console.log(`jogadorDois : ${jogadorDois}`)
                ganhador = "jogadorDois"
                status_jogadorUm = "Perdedor"
                status_jogadorDois = "Vencedor"
            }

            console.log(`Jogador 1 : ${status_jogadorUm}\nJogador 2 : ${status_jogadorDois}`)
            
            res.render('../views/resultado.ejs', {status_jogadorUm : status_jogadorUm, status_jogadorDois : status_jogadorDois, jogadas : jogadas})
        }


}

aplicacao.get('/reiniciar', function(req, res) {
    console.log("REINICIANDO JOGO");

    resultado.jogadorUm = false;
    resultado.jogadorDois = false;
    resultado.jogadorUmJogada = "";
    resultado.jogadorDoisJogada = "";

    res.redirect('/'); // Redirecionar para a página inicial após reiniciar
});

aplicacao.post('/jogadaJogadorUm', function(req,res) {
    console.log("Jogador Um Jogou");

    let jogada = req.body.escolha; 

    console.log(`Jogada: ${jogada}`)
    
    resultado.jogadorUm = true
    resultado.jogadorUmJogada = jogada

    console.log(resultado)
    verificar(req,res)

    // res.render('../views/resultado.ejs')
})


aplicacao.post('/jogadaJogadorDois', function(req,res){
    console.log("Jogador dois Jogou");

    let jogada = req.body.escolha;

    console.log(`Jogada: ${jogada}`)

    resultado.jogadorDois = true
    resultado.jogadorDoisJogada = jogada

    console.log(resultado)
    verificar(req,res)
})



//Use PORT provided in environment or default to 3000
// node web server
const port = process.env.PORT || 3000;

aplicacao.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});