import PetWeightHistoryRepository from '@infra/repositories/PetWeightHistoryRepository';

interface IRequest {
  petId: string;
}

export default class PetWeightHistoryService {
  private petWeightHistoryRepository = new PetWeightHistoryRepository();

  public async execute({ petId }: IRequest) {
    const history = await this.petWeightHistoryRepository.petHistory(petId);

    return history;
  }
}
