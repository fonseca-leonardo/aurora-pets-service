import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import upload from '@config/upload';

import authentication from '@shared/infra/http/middlewares/authentication';

import PetController from '../controller/PetController';

const router = Router();
const uploadMiddleware = multer(upload.multer);

const petController = new PetController();

router.post(
  '/',
  authentication,
  celebrate({
    [Segments.BODY]: {
      adoptable: Joi.boolean().optional(),
      name: Joi.string().required(),
      specieId: Joi.string().uuid().required(),
      birthDate: Joi.date().optional(),
      breedId: Joi.string().uuid().optional(),
      gender: Joi.string().equal('male', 'female').required(),
      description: Joi.string().optional(),
      ownerId: Joi.string().uuid().optional(),
      weight: Joi.number().optional(),
    },
  }),
  petController.store,
);

router.patch(
  '/:petId/ong',
  authentication,
  celebrate({
    [Segments.BODY]: {
      adoptable: Joi.boolean().optional(),
      name: Joi.string().optional(),
      specieId: Joi.string().uuid().optional(),
      birthDate: Joi.date().optional(),
      breedId: Joi.string().uuid().optional(),
      gender: Joi.string().equal('male', 'female').optional(),
      description: Joi.string().optional(),
      firstPhotoId: Joi.string().optional(),
      ownerId: Joi.string().uuid().optional(),
      weight: Joi.number().optional(),
    },
  }),
  petController.updateOng,
);

router.get(
  '/search',
  celebrate({
    [Segments.QUERY]: {
      skip: Joi.number().optional(),
      take: Joi.number().optional(),
      name: Joi.string().optional(),
      orderBy: Joi.string().optional(),
      sortBy: Joi.string().optional(),
      adoptable: Joi.boolean().optional(),
      ongId: Joi.string().uuid().optional(),
      specieId: Joi.string().uuid().optional(),
      birthDate: Joi.date().optional(),
      breedId: Joi.string().uuid().optional(),
      gender: Joi.string().equal('male', 'female').optional(),
      weight: Joi.number().optional(),
    },
  }),
  petController.show,
);

router.get('/:petId', authentication, petController.index);

router.get(
  '/:petId/weight-history',
  authentication,
  petController.weightHistory,
);

router.post(
  '/:petId/photo',
  authentication,
  uploadMiddleware.single('file'),
  petController.storePhoto,
);

router.delete(
  '/:petId/photo/:photoId',
  authentication,
  petController.removePhoto,
);

export default router;
