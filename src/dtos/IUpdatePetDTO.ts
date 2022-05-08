export default interface IUpdatePetDTO {
  petId: string;
  name?: string;
  ongId?: string;
  specieId?: string;
  adoptable?: boolean;
  breedId?: string;
  birthDate?: Date;
  ownerId?: string;
  firstPhotoId?: string;
  description?: string;
  weight?: number;
  gender?: 'male' | 'female';
}
