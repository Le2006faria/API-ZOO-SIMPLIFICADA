import express from 'express';
import cors from 'cors';
import { Ave } from './model/Ave';
import { Habitat } from './model/Habitat';
import { Atracao } from './model/Atracao';
import { DatabaseModel } from './model/DatabaseModel';
import AveController from './controller/AveController';

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

const aveController = new AveController('', 0, '', 0);

// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

/**
 * Listar informações cadastradas no banco de dados
 */
// Listar todos as aves cadastradas
server.get('/listar-aves', aveController.todosAve);

server.get('/listar-atracao', aveController.todosHabitats);

server.get('/listar-habitat', aveController.todasAtracoes);

/**
 * Cadastrar informações no sistema
 */
// Cadastra informações de uma nova ave
server.post('/novo/ave', aveController.novoAve);

// Cadastra informações de um novo habitat
server.post('/novo/habitat', aveController.novoHabitat);

// Cadastra informações de uma nova atracao
server.post('/novo/atracao', aveController.novaAtracao);

server.delete('/remover/animal', aveController.removerAve);
server.delete('/remover/atracao', aveController.removerAtracao);
server.delete('/remover/habitat', aveController.removerHabitat);

server.put('/atualizar/animal', aveController.atualizarAve);
server.put('/atualizar/atracao', aveController.atualizarAtracao);
server.put('/atualizar/habitat', aveController.atualizarHabitat);

new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        })
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
})