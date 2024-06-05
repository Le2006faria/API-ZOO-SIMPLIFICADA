import { Habitat } from "../model/Habitat";
import { Request, Response } from "express";

class HabitatController extends Habitat {
    public async todosHabitats(req: Request, res: Response): Promise<Response> {
        try {
            const habitat = JSON.stringify(await Habitat.listarHabitats());
            return res.status(200).json(habitat);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações.`);
        }
    }

    public async novoHabitat(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeHabitat } = req.body;
            const novoHabitat = new Habitat(nomeHabitat);
            const result = await Habitat.cadastrarHabitat(novoHabitat);

            if (result) {
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
        }
    }

    public async removerHabitat(req: Request, res: Response): Promise<Response> {
        try {
            const idHabitat = parseInt(req.query.idHabitat as string);
            const resultado = await Habitat.removerHabitat(idHabitat);

            if (resultado) {
                return res.status(200).json(`Habitat removido com sucesso`);
            } else {
                return res.status(401).json(`Erro ao remover habitat`);
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor");
        }
    }

    public async atualizarHabitat(req: Request, res: Response): Promise<Response> {
        try {
            const { nomeHabitat } = req.body;
            const idHabitat = parseInt(req.query.idHabitat as string);
            const novoHabitat = new Habitat(nomeHabitat);
            const result = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

            if (result) {
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor");

        }
    }

} export default HabitatController;