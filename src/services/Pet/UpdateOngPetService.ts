import errorMessages from '@constants/errorMessages';
import PetRepository from '@infra/repositories/PetRepository';
import PetWeightHistoryRepository from '@infra/repositories/PetWeightHistoryRepository';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  petId: string;
  ongId: string;
  name?: string;
  specieId?: string;
  adoptable?: boolean;
  breedId?: string;
  birthDate?: Date;
  ownerId?: string;
  firstPhotoId?: string;
  description?: string;
  gender?: 'male' | 'female';
  weight?: number;
}

export default class UpdateOngPetService {
  private petRepository = new PetRepository();
  private petWeightHistoryRepository = new PetWeightHistoryRepository();

  public async execute({
    petId,
    ongId,
    name,
    specieId,
    adoptable,
    birthDate,
    breedId,
    ownerId,
    gender,
    description,
    firstPhotoId,
    weight,
  }: IRequest) {
    let pet = await this.petRepository.findOngByPetId(ongId, petId);

    if (!pet) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    if (weight) {
      await this.petWeightHistoryRepository.create(petId, weight);
    }

    const updatedPet = await this.petRepository.update({
      ...pet,
      petId,
      name,
      specieId,
      adoptable,
      birthDate,
      breedId,
      firstPhotoId,
      ownerId,
      gender,
      description,
      weight,
    });

    return updatedPet;
  }
}
