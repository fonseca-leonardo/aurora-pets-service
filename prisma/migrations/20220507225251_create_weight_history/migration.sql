-- CreateTable
CREATE TABLE "PetWeightHistory" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetWeightHistory_pkey" PRIMARY KEY ("id")
);
