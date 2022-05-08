import ICreatePetPhotoDTO from '@dtos/ICreatePetPhotoDTO';
import prisma from '@shared/database/prisma';

export default class PetPhotoRepository {
  private readonly petPhotoRepository = prisma.petPhoto;

  public async create({ path, petId }: ICreatePetPhotoDTO) {
    return this.petPhotoRepository.create({
      data: {
        path,
        petId,
      },
    });
  }

  public async delete(id: string) {
    return this.petPhotoRepository.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string) {
    return this.petPhotoRepository.findUnique({
      where: {
        id,
      },
    });
  }
}
