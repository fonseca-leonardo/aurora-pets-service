-- CreateTable
CREATE TABLE "PetPhoto" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
