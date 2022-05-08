/*
  Warnings:

  - You are about to drop the `PetTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetTags" DROP CONSTRAINT "PetTags_petId_fkey";

-- DropTable
DROP TABLE "PetTags";

-- CreateTable
CREATE TABLE "PetTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PetToPetTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PetToPetTag_AB_unique" ON "_PetToPetTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PetToPetTag_B_index" ON "_PetToPetTag"("B");

-- AddForeignKey
ALTER TABLE "_PetToPetTag" ADD FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPetTag" ADD FOREIGN KEY ("B") REFERENCES "PetTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
