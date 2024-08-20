/*
  Warnings:

  - Added the required column `category` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RecipeCategory" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'DESSERT', 'SNACK', 'DRINK', 'OTHER');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "category" "RecipeCategory" NOT NULL;
