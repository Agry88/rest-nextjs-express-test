/*
  Warnings:

  - You are about to drop the `CatergoriesOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Catergory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CatergoriesOnPosts` DROP FOREIGN KEY `CatergoriesOnPosts_catergoryId_fkey`;

-- DropForeignKey
ALTER TABLE `CatergoriesOnPosts` DROP FOREIGN KEY `CatergoriesOnPosts_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `CatergoriesOnPosts`;

-- DropTable
DROP TABLE `Catergory`;

-- DropTable
DROP TABLE `Post`;
