import ICreateManyBreedDTO from '@dtos/ICreateManyBreedDTO';
import prisma from '@shared/database/prisma';

export default class BreedRepository {
  private breedRepository = prisma.breed;

  public async createMany({ names, specieId }: ICreateManyBreedDTO) {
    const breeds = names.map(el => ({ name: el, specieId }));

    await this.breedRepository.createMany({
      data: breeds,
    });

    return breeds;
  }

  public async specieBreeds(specieId: string, search?: string) {
    const breeds = await this.breedRepository.findMany({
      where: {
        specieId,
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    return breeds;
  }
}
