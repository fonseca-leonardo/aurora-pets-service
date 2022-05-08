import SpecieRepository from '@infra/repositories/SpecieRepository';

interface IRequest {
  name: string;
}

export default class CreateSpecieService {
  private specieRepository = new SpecieRepository();

  public async execute({ name }: IRequest) {
    const specie = await this.specieRepository.create({ name });

    console.log(specie);

    return specie;
  }
}
