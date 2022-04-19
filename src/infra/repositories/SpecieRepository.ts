import ICreateSpecieDTO from '@dtos/ICreateSpecieDTO';
import prisma from '@shared/database/prisma';

export default class SpecieRepository {
  private specieRepository = prisma.specie;

  public async create({ name }: ICreateSpecieDTO) {
    const specie = await this.specieRepository.create({
      data: {
        name,
      },
    });

    return specie;
  }

  public async listAll() {
    const species = await this.specieRepository.findMany();

    return species;
  }
}
