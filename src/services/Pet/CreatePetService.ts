import PetRepository from '@infra/repositories/PetRepository';
import PetWeightHistoryRepository from '@infra/repositories/PetWeightHistoryRepository';

interface IRequest {
  name: string;
  ongId: string;
  specieId: string;
  adoptable: boolean;
  breedId?: string;
  ownerId?: string;
  firstPhotoId?: string;
  description?: string;
  birthDate?: Date;
  weight?: number;
  gender: 'male' | 'female';
}

export default class CreatePetService {
  private petRepository = new PetRepository();
  private petWeightHistoryRepository = new PetWeightHistoryRepository();

  public async execute({
    adoptable,
    name,
    ongId,
    specieId,
    birthDate,
    breedId,
    description,
    ownerId,
    gender,
    weight,
  }: IRequest) {
    const pet = await this.petRepository.create({
      adoptable,
      name,
      ongId,
      specieId,
      birthDate,
      breedId,
      description,
      ownerId,
      gender,
      weight,
    });

    if (weight) {
      await this.petWeightHistoryRepository.create(pet.id, weight);
    }

    return pet;
  }
}
