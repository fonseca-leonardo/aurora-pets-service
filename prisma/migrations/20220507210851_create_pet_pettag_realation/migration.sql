/*
  Warnings:

  - You are about to drop the `_PetToPetTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PetToPetTag" DROP CONSTRAINT "_PetToPetTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetToPetTag" DROP CONSTRAINT "_PetToPetTag_B_fkey";

-- DropTable
DROP TABLE "_PetToPetTag";

-- CreateTable
CREATE TABLE "PetTagsOnPets" (
    "petId" TEXT NOT NULL,
    "petTagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetTagsOnPets_pkey" PRIMARY KEY ("petId","petTagId")
);

-- AddForeignKey
ALTER TABLE "PetTagsOnPets" ADD CONSTRAINT "PetTagsOnPets_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetTagsOnPets" ADD CONSTRAINT "PetTagsOnPets_petTagId_fkey" FOREIGN KEY ("petTagId") REFERENCES "PetTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
