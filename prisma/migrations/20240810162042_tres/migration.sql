-- AlterTable
ALTER TABLE "ChatBot" ADD COLUMN     "background" TEXT,
ADD COLUMN     "helpdesk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "textColor" TEXT;

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT;
