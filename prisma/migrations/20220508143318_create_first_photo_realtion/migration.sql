/*
  Warnings:

  - You are about to drop the column `firstPhoto` on the `Pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstPhotoId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petId]` on the table `PetPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "firstPhoto",
ADD COLUMN     "firstPhotoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_firstPhotoId_key" ON "Pet"("firstPhotoId");

-- CreateIndex
CREATE UNIQUE INDEX "PetPhoto_petId_key" ON "PetPhoto"("petId");

-- RenameForeignKey
ALTER TABLE "PetPhoto" RENAME CONSTRAINT "PetPhoto_petId_fkey" TO "petPhotos_fk";

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "petFirstPhoto_fk" FOREIGN KEY ("petId") REFERENCES "Pet"("firstPhotoId") ON DELETE RESTRICT ON UPDATE CASCADE;
