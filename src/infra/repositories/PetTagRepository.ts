import prisma from '@shared/database/prisma';

export default class PetTagRepository {
  private petTagRepository = prisma.petTag;
  private petTagsOnPetsRepository = prisma.petTagsOnPets;

  public async create(name: string) {
    const petTag = await this.petTagRepository.create({
      data: {
        name,
      },
    });

    return petTag;
  }

  public async associatePetToTag(petId: string, tagId: string) {
    await this.petTagsOnPetsRepository.create({
      data: {
        petId,
        petTagId: tagId,
      },
    });
  }

  public async disassociatePetToTag(petId: string, tagId: string) {
    await this.petTagsOnPetsRepository.delete({
      where: {
        petId_petTagId: {
          petId,
          petTagId: tagId,
        },
      },
    });
  }

  public async findAll() {
    return this.petTagRepository.findMany();
  }
}
