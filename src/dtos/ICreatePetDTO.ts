export default interface ICreatePetDTO {
  name: string;
  ongId: string;
  specieId: string;
  adoptable: boolean;
  breedId?: string;
  ownerId?: string;
  description?: string;
  weight?: number;
  gender: 'male' | 'female';
  birthDate?: Date;
}
