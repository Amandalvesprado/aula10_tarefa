const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/aula10_tarefa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado ao MongoDB'));

// Middleware
app.use(express.json());

// Rotas
const alunoRouter = require('./route/alunoRoute');
const disciplinaRouter = require('./route/disciplinaRoute');
app.use('/alunos', alunoRouter);
app.use('/disciplinas', disciplinaRouter);

// Iniciar o servidor
app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
