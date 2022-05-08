import errorMessages from '@constants/errorMessages';
import PetPhotoRepository from '@infra/repositories/PetPhotoRepository';
import PetRepository from '@infra/repositories/PetRepository';
import StorageProvider from '@shared/container/providers/StorageProvider';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  petId: string;
  ongId: string;
  photoId: string;
}

export default class RemovePetPhotoService {
  private petRepository = new PetRepository();
  private petPhotoRepository = new PetPhotoRepository();
  private storageProvider = new StorageProvider();

  public async execute({ petId, ongId, photoId }: IRequest) {
    const pet = this.petRepository.findOngByPetId(ongId, petId);

    if (!pet) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    const petPhoto = await this.petPhotoRepository.findById(photoId);

    if (!petPhoto) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    await this.storageProvider.deleteFile(petPhoto.path);

    await this.petPhotoRepository.delete(photoId);
  }
}
