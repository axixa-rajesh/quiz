// backend/seeders/seedAll.js

import sequelize from '../config/db.js';

export const runSeedData = async () => {
    try {
        console.log('🌱 Seeding Realistic Data across all modules...');

        await sequelize.query(`
            INSERT INTO Quizzes (id, title, subject, topic, createdAt, updatedAt) VALUES
            (1, 'Basics of Algebra', 'Mathematics', 'Algebra', NOW(), NOW()),
            (2, 'Newton Laws of Motion', 'Physics', 'Mechanics', NOW(), NOW()),
            (3, 'Chemical Bonding', 'Chemistry', 'Inorganic Chemistry', NOW(), NOW())
            ON DUPLICATE KEY UPDATE title=VALUES(title);
        `);
        
        await sequelize.query(`
            INSERT INTO QuizAttempts (id, user_id, quiz_id, score, createdAt, updatedAt) VALUES
            (1, 101, 1, 85.00, NOW(), NOW()),
            (2, 102, 1, 90.00, NOW(), NOW()),
            (3, 103, 2, 75.50, NOW(), NOW()),
            (4, 101, 3, 92.00, NOW(), NOW())
            ON DUPLICATE KEY UPDATE score=VALUES(score);
        `);

        console.log('✅ Realistic Seed Data Inserted Successfully!');
    } catch (error) {
        console.error('❌ Seeding Error:', error.message);
    }
};

runSeedData();