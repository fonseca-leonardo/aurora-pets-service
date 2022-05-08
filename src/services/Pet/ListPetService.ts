import PetRepository from '@infra/repositories/PetRepository';

interface IRequest {
  name: string;
  ongId: string;
  specieId: string;
  adoptable: boolean;
  breedId?: string;
  birthDate?: Date;
  gender: 'male' | 'female';
  orderBy?: string;
  sortBy?: 'ASC' | 'DESC';
  skip?: number;
  take?: number;
  weight?: number;
}

export default class ListPetService {
  private petRepository = new PetRepository();

  public async execute({
    name,
    ongId,
    specieId,
    adoptable,
    birthDate,
    breedId,
    gender,
    orderBy,
    skip,
    sortBy,
    take,
    weight,
  }: IRequest) {
    const { list, total } = await this.petRepository.search({
      name,
      ongId,
      specieId,
      adoptable,
      birthDate,
      breedId,
      gender,
      orderBy,
      sortBy,
      skip: skip || 0,
      take: take || 10,
      weight,
    });

    return {
      total,
      list: list.map(pet => ({
        ...pet,
        ...(pet.firstPhoto && {
          firstPhoto: `${process.env.STORAGE_URL}/${pet.firstPhoto.path}`,
        }),
      })),
    };
  }
}
