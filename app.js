const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false})

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './banco_do_jogo.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();


app.use(express.static("./Frontend/"));

app.use(express.json());

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco de dados
    res.write('<a href="/index.html">VOLTAR</a>');
    res.end(); // fecha o banco de dados
});

//Insere um registro
app.post('/insere-numero', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    sql = "INSERT INTO numeros (numero) VALUES ('" + req.body.meu_input + "');";
    console.log(sql);
    db.run(sql, [], err => {
        if(err){
            throw err;
        }
    });
    db.close(); // Fecha o banco de dados
});

app.get('/teste', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM numeros;';
	console.log(sql);
    db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/adivinhar', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Acess-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM numeros WHERE id = ${req.query.numero_id} AND numero = ${req.query.numero_tentado}`
    console.log(sql)
    db.all(sql, [], (err, row) => {
        if (err) {
            throw err
        } else if (Object.keys(row).length === 0) {
            res.send(
            '<h1 style="background-color: #B281F1;">Você errou, tente novamente<h1>');
        } else {
            res.send(
                '<h1 style="background-color: #B281F1;">Parabéns, você acertou!!!<h1>'
                );
        }
    });  
    db.close();
})

app.listen(port, hostname, () => {
    console.log(`Page server running at http://${hostname}:${port}/`);
});