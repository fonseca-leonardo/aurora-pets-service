import PetTagRepository from '@infra/repositories/PetTagRepository';

export default class ListPetTagService {
  private petTageRepository = new PetTagRepository();

  public async execute() {
    const petTags = await this.petTageRepository.findAll();

    return petTags;
  }
}
