import errorMessages from '@constants/errorMessages';
import PetPhotoRepository from '@infra/repositories/PetPhotoRepository';
import PetRepository from '@infra/repositories/PetRepository';
import StorageProvider from '@shared/container/providers/StorageProvider';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  petId: string;
  ongId: string;
  file?: Express.Multer.File;
}

export default class UploadPetPhotoService {
  private petRepository = new PetRepository();
  private petPhotoRepository = new PetPhotoRepository();
  private storageProvider = new StorageProvider();

  public async execute({ petId, ongId, file }: IRequest) {
    if (!file) {
      throw new ServerError(errorMessages.INTERNAL_SERVER_ERROR);
    }

    const pet = this.petRepository.findOngByPetId(ongId, petId);

    if (!pet) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    await this.storageProvider.saveFile(file.filename, {
      folder: `pets/${petId}/photos`,
      makePublic: true,
    });

    await this.petPhotoRepository.create({
      petId,
      path: `pets/${petId}/photos/${file.filename}`,
    });
  }
}
