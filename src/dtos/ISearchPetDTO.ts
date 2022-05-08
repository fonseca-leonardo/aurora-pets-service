export default interface ISearchPetDTO {
  name?: string;
  ongId?: string;
  specieId?: string;
  adoptable?: boolean;
  breedId?: string;
  birthDate?: Date;
  weight?: number;
  gender?: 'male' | 'female';
  orderBy?: string;
  sortBy?: 'ASC' | 'DESC';
  skip: number;
  take: number;
}
