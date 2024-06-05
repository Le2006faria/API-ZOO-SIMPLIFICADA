import { Atracao } from "../model/Atracao";
import { Request, Response } from "express";

class AtracaoController extends Atracao {
    public async todasAtracoes(req: Request, res: Response): Promise<Response> {
        try {
            const atracao = JSON.stringify(await Atracao.listarAtracoes());
            return res.status(200).json(atracao);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações.`);
        }
    }

    public async novaAtracao(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeAtracao, idHabitat } = req.body;
            const novaAtracao = new Atracao(nomeAtracao);

            let result = false;

            if (idHabitat != undefined) {
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            if (result) {
                return res.status(200).json('Atração cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
        }
    }

    public async removerAtracao(req: Request, res: Response): Promise<Response> {
        try {
            const idAtracao = parseInt(req.query.idAtracao as string);
            const resultado = await Atracao.removerAtracao(idAtracao);

            if (resultado) {
                return res.status(200).json(`Atração removida com sucesso`);
            } else {
                return res.status(401).json(`Erro ao remover atração`);
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor");
        }
    }

    public async atualizarAtracao(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeAtracao } = req.body;
            const idAtracao = parseInt(req.query.idAtracao as string);
            const novaAtracao = new Atracao(nomeAtracao);
            const result = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            if (result) {
                return res.status(200).json('Atração cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor");

        }
    }
}

export default AtracaoController;