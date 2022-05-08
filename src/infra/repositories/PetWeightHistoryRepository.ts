import prisma from '@shared/database/prisma';

export default class PetWeightHistoryRepository {
  private petWeightHistoryRepository = prisma.petWeightHistory;

  public async create(petId: string, weight: number) {
    const petWeightHistory = await this.petWeightHistoryRepository.create({
      data: {
        petId,
        weight,
      },
    });

    return petWeightHistory;
  }

  public async petHistory(petId: string) {
    const history = await this.petWeightHistoryRepository.findMany({
      where: {
        petId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return history;
  }
}
