-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('EMAIL', 'API');

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
"id" SERIAL,
    "title" TEXT,
    "long" TEXT NOT NULL,
    "short" TEXT,
    "authorId" INTEGER,
    "clicks" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
"id" SERIAL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,
    "emailToken" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Links.long_unique" ON "Links"("long");

-- CreateIndex
CREATE UNIQUE INDEX "Token.emailToken_unique" ON "Token"("emailToken");

-- AddForeignKey
ALTER TABLE "Links" ADD FOREIGN KEY("authorId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
