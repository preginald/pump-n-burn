-- CreateTable
CREATE TABLE `Gym` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `start` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `gym_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Set` (
    `id` VARCHAR(191) NOT NULL,
    `start` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `finish` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `duration` INTEGER NOT NULL,
    `session_id` VARCHAR(191) NOT NULL,
    `exercise_id` VARCHAR(191) NOT NULL,
    `weight` DECIMAL(65, 30) NOT NULL,
    `unit` ENUM('KG', 'LB') NOT NULL,
    `reps_r` INTEGER NOT NULL,
    `reps_l` INTEGER NULL,
    `type` ENUM('Warm', 'Heavy') NOT NULL DEFAULT 'Warm',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('Barbell', 'Body', 'Dumbell', 'Machine', 'Plate', 'Cable') NOT NULL,
    `mechanics` ENUM('Compound', 'Isolation') NOT NULL,
    `force` ENUM('Pull', 'Push') NOT NULL,
    `lateral` ENUM('Bi', 'Uni') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Muscle` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `muscleGroupsId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MuscleGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseAgonist` (
    `muscleGroupId` VARCHAR(191) NOT NULL,
    `exerciseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`muscleGroupId`, `exerciseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_gym_id_fkey` FOREIGN KEY (`gym_id`) REFERENCES `Gym`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Muscle` ADD CONSTRAINT `Muscle_muscleGroupsId_fkey` FOREIGN KEY (`muscleGroupsId`) REFERENCES `MuscleGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseAgonist` ADD CONSTRAINT `ExerciseAgonist_muscleGroupId_fkey` FOREIGN KEY (`muscleGroupId`) REFERENCES `MuscleGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseAgonist` ADD CONSTRAINT `ExerciseAgonist_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
