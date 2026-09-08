import { Sequelize } from 'sequelize';

// Password ko directly string mein daal diya hai
const sequelize = new Sequelize('quizdb', 'root', 'kanan@05suthar', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    port: 3306
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ DATABASE CONNECTED SUCCESSFULLY!');
    } catch (error) {
        console.error('❌ DB CONNECTION ERROR:', error.message);
    }
};

export default sequelize;