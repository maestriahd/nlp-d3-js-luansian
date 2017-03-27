// importa librerias necesarias
const express = require('express');
const router = express.Router();
// libreria de procesamiento de lenguaje natural
const nlp = require('compromise');
// textos de prueba
const corpus = require('nlp-corpus');
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  // obtiene un texto aleatorio de discursos presidenciales
  var txt = fs.readFileSync(__dirname+'/database_manovich.txt', "utf8");

  // entrega el texto al motor de NLP
  var r = nlp(txt);
  // extrae las personas del texto
  var people = r.people();
  // limpia un poco el texto
  people.normalize();
  // ordena el resultado por frecuencia
  people.sort('frequency').unique();

  // extrae los sustantivos
  var nouns = r.nouns();

  var values = r.values();
  var adjectives = r.adjectives();
  var acronyms = r.acronyms();
  // hace el render de la vista entregando el texto, la lista de personas
  // y sustantivos
  res.render('nlp', {
    txt: txt,
    people: {
      list: people.list,
      length: people.list.length
    },
    nouns: {
      list: nouns.list,
      length: nouns.list.length
    },

    values: {
      list: values.list,
      length: values.list.length
    },
        adjectives: {
          list: adjectives.list,
          length: adjectives.list.length
        },

            acronyms: {
              list: acronyms.list,
              length: acronyms.list.length
            }
    });
});

module.exports = router;
