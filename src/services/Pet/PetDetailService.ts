import errorMessages from '@constants/errorMessages';
import PetRepository from '@infra/repositories/PetRepository';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  petId: string;
}

export default class PetDetailService {
  private readonly petRepository = new PetRepository();

  public async execute({ petId }: IRequest) {
    const pet = await this.petRepository.detail(petId);

    if (!pet) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    return {
      ...pet,
      petPhotos: pet.petPhotos.map(petPhoto => ({
        id: petPhoto.id,
        url: `${process.env.STORAGE_URL}/${petPhoto.path}`,
      })),
      ...(pet.firstPhoto && {
        firstPhoto: `${process.env.STORAGE_URL}/${pet.firstPhoto.path}`,
      }),
    };
  }
}
