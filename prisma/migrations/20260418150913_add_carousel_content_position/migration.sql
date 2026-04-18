-- CreateEnum
CREATE TYPE "ContentPosition" AS ENUM ('TOP_LEFT', 'TOP_CENTER', 'TOP_RIGHT', 'CENTER_LEFT', 'CENTER', 'CENTER_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_CENTER', 'BOTTOM_RIGHT');

-- DropIndex
DROP INDEX "Partner_displayOrder_idx";

-- AlterTable
ALTER TABLE "CarouselSlide" ADD COLUMN     "contentPosition" "ContentPosition" NOT NULL DEFAULT 'CENTER',
ALTER COLUMN "updatedAt" DROP DEFAULT;
