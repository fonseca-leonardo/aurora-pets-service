import { Request, Response } from 'express';

import errorMessages from '@constants/errorMessages';

import CreatePetService from '@services/Pet/CreatePetService';
import ListPetService from '@services/Pet/ListPetService';
import UpdateOngPetService from '@services/Pet/UpdateOngPetService';
import ServerError from '@shared/errors/ServerError';
import PetWeightHistoryService from '@services/Pet/PetWeightHistoryService';
import UploadPetPhotoService from '@services/Pet/Photo/UploadPetPhotoService';
import RemovePetPhotoService from '@services/Pet/Photo/RemovePetPhotoService';
import PetDetailService from '@services/Pet/PetDetailService';

export default class PetController {
  public async store(request: Request, response: Response) {
    const {
      adoptable,
      name,
      specieId,
      birthDate,
      breedId,
      description,
      firstPhotoId,
      ownerId,
      gender,
      weight,
    } = request.body;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }

    const createPet = new CreatePetService();

    const pet = await createPet.execute({
      adoptable,
      name,
      ongId: authData?.organizationId,
      specieId,
      birthDate,
      breedId,
      description,
      firstPhotoId,
      ownerId,
      gender,
      weight,
    });

    return response.formatedJson(pet);
  }

  public async updateOng(request: Request, response: Response) {
    const {
      name,
      specieId,
      adoptable,
      birthDate,
      breedId,
      gender,
      ownerId,
      firstPhotoId,
      weight,
    } = request.body;

    const { petId } = request.params;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }
    const updatePet = new UpdateOngPetService();

    const pet = await updatePet.execute({
      name,
      specieId,
      adoptable,
      birthDate,
      breedId,
      gender,
      ownerId,
      firstPhotoId,
      ongId: authData.organizationId,
      petId,
      weight,
    });

    return response.formatedJson(pet);
  }

  public async show(request: Request, response: Response) {
    const {
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
    } = request.query as any;

    const listPet = new ListPetService();

    const result = await listPet.execute({
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
    });

    return response.formatedJson(result);
  }

  public async index(request: Request, response: Response) {
    const { petId } = request.params;

    const petDetail = new PetDetailService();

    const pet = await petDetail.execute({ petId });

    return response.formatedJson(pet);
  }

  public async weightHistory(request: Request, response: Response) {
    const { petId } = request.params;

    const weightHistory = new PetWeightHistoryService();

    const history = await weightHistory.execute({ petId });

    return response.formatedJson(history);
  }

  public async storePhoto(request: Request, response: Response) {
    const { petId } = request.params;
    const { file } = request;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }

    const uploadPetPhoto = new UploadPetPhotoService();

    await uploadPetPhoto.execute({
      file,
      petId,
      ongId: authData.organizationId,
    });

    return response.status(204).send();
  }

  public async removePhoto(request: Request, response: Response) {
    const { petId, photoId } = request.params;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }

    const removePetPhoto = new RemovePetPhotoService();

    await removePetPhoto.execute({
      ongId: authData.organizationId,
      petId,
      photoId,
    });

    return response.status(204).send();
  }
}
