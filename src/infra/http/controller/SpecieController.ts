import CreateSpecieService from '@services/CreateSpecieService';
import ListAllSpeciesService from '@services/ListAllSpeciesService';
import { Request, Response } from 'express';

export default class SpecieController {
  public async store(request: Request, response: Response) {
    const { name } = request.body;

    const createSpecie = new CreateSpecieService();

    const specie = await createSpecie.execute({ name });

    return response.formatedJson(specie);
  }

  public async show(request: Request, response: Response) {
    const listAllSpecies = new ListAllSpeciesService();

    const species = await listAllSpecies.execute();

    return response.formatedJson(species);
  }
}
