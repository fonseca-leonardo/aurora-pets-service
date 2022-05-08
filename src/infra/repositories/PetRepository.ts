import ICreatePetDTO from '@dtos/ICreatePetDTO';
import ISearchPetDTO from '@dtos/ISearchPetDTO';
import IUpdatePetDTO from '@dtos/IUpdatePetDTO';
import { Prisma } from '@prisma/client';
import prisma from '@shared/database/prisma';

export default class PetRepository {
  private readonly petRepository = prisma.pet;

  public async create({
    adoptable,
    name,
    ongId,
    specieId,
    birthDate,
    breedId,
    description,
    ownerId,
    gender,
    weight,
  }: ICreatePetDTO) {
    const pet = await this.petRepository.create({
      data: {
        adoptable,
        name,
        ongId,
        specieId,
        birthDate,
        breedId,
        description,
        ownerId,
        gender,
        weight,
      },
    });

    return pet;
  }

  public async search({
    adoptable,
    birthDate,
    breedId,
    gender,
    name,
    ongId,
    specieId,
    skip,
    take,
    orderBy,
    sortBy,
    weight,
  }: ISearchPetDTO) {
    const filter: Prisma.PetWhereInput = {
      ...(adoptable && { adoptable }),
      ...(birthDate && {
        birthDate: {
          lte: birthDate,
        },
      }),
      ...(breedId && { breedId }),
      ...(gender && { gender }),
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
      ...(ongId && { ongId }),
      ...(specieId && { specieId }),
      ...(weight && {
        weight: {
          lte: weight,
        },
      }),
    };

    const list = await this.petRepository.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        adoptable: true,
        firstPhoto: {
          select: {
            path: true,
          },
        },
        description: true,
        birthDate: true,
        gender: true,
        ownerId: true,
        weight: true,
        petTags: {
          select: {
            petTag: {
              select: {
                name: true,
              },
            },
          },
        },
        breed: {
          select: {
            name: true,
          },
        },
        specie: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take,
      ...(orderBy && {
        orderBy: {
          [orderBy]: sortBy || 'ASC',
        },
      }),
    });

    const total = await this.petRepository.count({
      where: filter,
    });

    return { list, total };
  }

  public async findOngByPetId(ongId: string, petId: string) {
    const pet = await this.petRepository.findFirst({
      where: {
        id: petId,
        ongId,
      },
    });

    return pet;
  }

  public async update({
    petId,
    adoptable,
    birthDate,
    breedId,
    name,
    gender,
    ongId,
    ownerId,
    specieId,
    description,
    firstPhotoId,
    weight,
  }: IUpdatePetDTO) {
    const pet = await this.petRepository.update({
      where: {
        id: petId,
      },
      data: {
        adoptable,
        birthDate,
        breedId,
        name,
        gender,
        ongId,
        ownerId,
        specieId,
        firstPhotoId,
        description,
        weight,
      },
    });

    return pet;
  }

  public async detail(petId: string) {
    const pet = await this.petRepository.findFirst({
      where: {
        id: petId,
      },
      select: {
        id: true,
        name: true,
        adoptable: true,
        firstPhoto: {
          select: {
            id: true,
            path: true,
          },
        },
        description: true,
        birthDate: true,
        gender: true,
        ownerId: true,
        weight: true,
        petTags: {
          select: {
            petTag: {
              select: {
                name: true,
              },
            },
          },
        },
        breed: {
          select: {
            name: true,
          },
        },
        specie: {
          select: {
            name: true,
          },
        },
        petPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
      },
    });

    return pet;
  }
}
