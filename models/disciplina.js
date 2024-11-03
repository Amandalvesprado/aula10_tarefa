const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cargaHoraria: { type: Number, required: true },
    sala: { type: String, required: true }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);
