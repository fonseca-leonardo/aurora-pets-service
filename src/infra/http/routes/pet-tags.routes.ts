import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authentication from '@shared/infra/http/middlewares/authentication';

import PetTagController from '../controller/PetTagController';

const router = Router();

const petTagController = new PetTagController();

router.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  petTagController.store,
);

router.get('/all', authentication, petTagController.show);

router.post(
  '/:tagId/associate',
  authentication,
  petTagController.associatePetToTag,
);

router.delete(
  '/:tagId/disassociate',
  authentication,
  petTagController.disassociatePetToTag,
);

export default router;
