import BreedRepository from '@infra/repositories/BreedRepository';

interface IRequest {
  specieId: string;

  search?: string;
}

export default class ListSpecieBreedService {
  private breedRepository = new BreedRepository();

  public async execute({ specieId, search }: IRequest) {
    const breeds = await this.breedRepository.specieBreeds(specieId, search);

    return breeds;
  }
}
