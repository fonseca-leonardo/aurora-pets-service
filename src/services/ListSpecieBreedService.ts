import BreedRepository from '@infra/repositories/BreedRepository';

interface IRequest {
  specieId: string;
}

export default class ListSpecieBreedService {
  private breedRepository = new BreedRepository();

  public async execute({ specieId }: IRequest) {
    const breeds = await this.breedRepository.specieBreeds(specieId);

    return breeds;
  }
}
