/*
  Warnings:

  - Added the required column `gender` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL;
