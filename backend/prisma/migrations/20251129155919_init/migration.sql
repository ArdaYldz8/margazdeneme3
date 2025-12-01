-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "licenseNo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT,
    "district" TEXT,
    "address" TEXT,
    "status" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "distributor" TEXT,
    "tankLevel" INTEGER NOT NULL DEFAULT 0,
    "lastData" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_licenseNo_key" ON "Dealer"("licenseNo");
