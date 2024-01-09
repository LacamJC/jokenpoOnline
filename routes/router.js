const express = require('express')

const router = express.Router()

router.get('/', function(req,res) {
    res.render('../views/index.ejs')
})

router.get('/jogadorUm', function(req,res) {
    res.render('../views/players/jogadorUm.ejs')
})

router.get('/jogadorDois', function(req,res) {
    res.render('../views/players/jogadorDois.ejs')
})

var status_jogadorUm ="";
var status_jogadorDois = "";
var jogadas = [];
router.get('/resultado', function(req,res) {
    res.render("../views/resultado.ejs", {status_jogadorUm : status_jogadorUm, status_jogadorDois : status_jogadorDois, jogadas : jogadas })
})

module.exports = router