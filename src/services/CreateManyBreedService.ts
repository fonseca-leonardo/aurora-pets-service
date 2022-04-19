import BreedRepository from '@infra/repositories/BreedRepository';

interface IRequest {
  names: string[];
  specieId: string;
}

export default class CreateManyBreedService {
  private breedRepository = new BreedRepository();

  public async execute({ names, specieId }: IRequest) {
    const breeds = await this.breedRepository.createMany({ names, specieId });

    return breeds;
  }
}
