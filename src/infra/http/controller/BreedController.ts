import { Request, Response } from 'express';
import ListSpecieBreedService from '@services/Breed/ListSpecieBreedService';
import CreateManyBreedService from '@services/Breed/CreateManyBreedService';

export default class BreedController {
  public async show(request: Request, response: Response) {
    const { specieId } = request.params;
    const { search } = request.query as { search: string };

    const listSpecieBreed = new ListSpecieBreedService();

    const breeds = await listSpecieBreed.execute({ specieId, search });

    return response.formatedJson(breeds);
  }

  public async store(request: Request, response: Response) {
    const { names, specieId } = request.body;

    const createBreed = new CreateManyBreedService();

    const breeds = await createBreed.execute({ names, specieId });

    return response.formatedJson(breeds);
  }
}
