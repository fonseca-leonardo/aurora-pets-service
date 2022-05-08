import authentication from '@shared/infra/http/middlewares/authentication';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SpecieController from '../controller/SpecieController';

const specieController = new SpecieController();

const router = Router();

router.get('/all', specieController.show);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  authentication,
  specieController.store,
);

export default router;
