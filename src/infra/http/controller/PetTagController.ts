import { Request, Response } from 'express';

import errorMessages from '@constants/errorMessages';
import ServerError from '@shared/errors/ServerError';

import ListPetTagService from '@services/PetTag/AllPetTagService';
import CreatePetTagService from '@services/PetTag/CreatePetTagService';
import AssociateTagToPetService from '@services/PetTag/AssociateTagToPet';
import DisassociateTagToPetService from '@services/PetTag/DisassociateTagToPet';

export default class PetTagController {
  public async store(request: Request, response: Response) {
    const { name } = request.body;

    const createPetTag = new CreatePetTagService();

    const petTag = await createPetTag.execute(name);

    return response.formatedJson(petTag);
  }

  public async show(request: Request, response: Response) {
    const listPetTag = new ListPetTagService();

    const petTags = await listPetTag.execute();

    return response.formatedJson(petTags);
  }

  public async associatePetToTag(request: Request, response: Response) {
    const { tagId } = request.params;
    const { petId } = request.body;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }

    const associatePetToTag = new AssociateTagToPetService();

    await associatePetToTag.execute({
      ongId: authData.organizationId,
      petId,
      tagId,
    });

    return response.status(204).send();
  }

  public async disassociatePetToTag(request: Request, response: Response) {
    const { tagId } = request.params;
    const { petId } = request.body;

    const authData = request.authData;

    if (!authData?.organizationId) {
      throw new ServerError(errorMessages.NOT_ALLOWED, 401);
    }

    const disassociateTagToPet = new DisassociateTagToPetService();

    await disassociateTagToPet.execute({
      petId,
      tagId,
      ongId: authData.organizationId,
    });

    return response.status(204).send();
  }
}
