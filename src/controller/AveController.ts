import { Ave } from "../model/Ave";
import { Request, Response } from "express";
import { Habitat } from "../model/Habitat";
import { Atracao } from "../model/Atracao";

class AveController extends Ave {

    public async todosAve(req: Request, res: Response): Promise<Response> {
        try {
            const aves = JSON.stringify(await Ave.listarAves());
            return res.status(200).json(aves);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações.`);
        }
    }

    public async todosHabitats(req: Request, res: Response): Promise<Response> {
        try {
            const habitat = JSON.stringify(await Habitat.listarHabitats());
            return res.status(200).json(habitat);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações.`);
        }
    }

    public async todasAtracoes(req: Request, res: Response): Promise<Response> {
        try {
            const atracao = JSON.stringify(await Atracao.listarAtracoes());
            return res.status(200).json(atracao);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações.`);
        }
    }

    public async novoAve(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, idade, genero, envergadura, idHabitat } = req.body;
            const novaAve = new Ave(nome, idade, genero, envergadura);
            const result = await Ave.cadastrarAve(novaAve, idHabitat);

            if (result) {
                return res.status(200).json('Ave cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
            }

        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
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

    public async removerAve(req: Request, res: Response): Promise<Response> {
        try {
            const idAnimal = parseInt(req.query.idAnimal as string);
            const resultado = await Ave.removerAve(idAnimal);

            if (resultado) {
                return res.status(200).json(`Animal removido com sucesso`);
            } else {
                return res.status(401).json(`Erro ao remover animal`);
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor");
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

    public async atualizarAve(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, idade, genero, envergadura } = req.body;
            const idAnimal = parseInt(req.query.idAnimal as string);
            const novaAve = new Ave(nome, idade, genero, envergadura);
            const result = await Ave.atualizarAve(novaAve, idAnimal);

            if (result) {
                return res.status(200).json('Ave atualizada com sucesso');
            } else {
                return res.status(400).json('Não foi possível atualizar a ave no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo ${error}`);
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor");

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

export default AveController;