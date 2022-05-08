import SpecieRepository from '@infra/repositories/SpecieRepository';

export default class ListAllSpeciesService {
  private specieRepository = new SpecieRepository();

  public async execute() {
    const species = await this.specieRepository.listAll();

    return species;
  }
}
