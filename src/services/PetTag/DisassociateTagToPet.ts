import errorMessages from '@constants/errorMessages';
import PetRepository from '@infra/repositories/PetRepository';
import PetTagRepository from '@infra/repositories/PetTagRepository';
import ServerError from '@shared/errors/ServerError';

interface IRequest {
  ongId: string;
  petId: string;
  tagId: string;
}

export default class DisassociateTagToPetService {
  private petTagRepository = new PetTagRepository();
  private petRepository = new PetRepository();

  public async execute({ ongId, petId, tagId }: IRequest) {
    const pet = await this.petRepository.findOngByPetId(ongId, petId);

    if (!pet) {
      throw new ServerError(errorMessages.PET_NOT_FOUND);
    }

    await this.petTagRepository.disassociatePetToTag(petId, tagId);
  }
}
