import authentication from '@shared/infra/http/middlewares/authentication';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import BreedController from '../controller/BreedController';

const specieController = new BreedController();

const router = Router();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      names: Joi.array().items(Joi.string()).required(),
      specieId: Joi.string().uuid().required(),
    },
  }),
  authentication,
  specieController.store,
);

router.get('/:specieId', specieController.show);

export default router;
