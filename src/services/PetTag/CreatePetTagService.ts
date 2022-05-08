import PetTagRepository from '@infra/repositories/PetTagRepository';

export default class CreatePetTagService {
  private petTagRepository = new PetTagRepository();

  public async execute(name: string) {
    return await this.petTagRepository.create(name);
  }
}
