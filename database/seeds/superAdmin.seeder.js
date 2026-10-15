import mongoose from 'mongoose';
import SuperAdmin from '../../models/superAdmin.model.js';
import dbConfig from '../../config/db.config.js';
import {
  SUPER_ADMIN_NAME,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PHONE,
} from '../../config/env.config.js';
import logger from '../../utils/logger.util.js';

/**
 * Seed default SuperAdmin user from environment credentials
 */
export const seedSuperAdmin = async () => {
  const email = SUPER_ADMIN_EMAIL || process.env.SUPER_ADMIN_EMAIL || 'superAdmin@gmail.com';
  const name = SUPER_ADMIN_NAME || process.env.SUPER_ADMIN_NAME || 'Super Admin';
  const phone = SUPER_ADMIN_PHONE || process.env.SUPER_ADMIN_PHONE || '+1234567890';
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const existingSuperAdmin = await SuperAdmin.findOne({ email: normalizedEmail });

    if (existingSuperAdmin) {
      logger.info(`SuperAdmin already exists with email: ${existingSuperAdmin.email}`);
      return existingSuperAdmin;
    }

    const superAdmin = await SuperAdmin.create({
      name,
      email: normalizedEmail,
      phone,
    });

    logger.info(`✅ SuperAdmin seeded successfully: ${superAdmin.email} (ID: ${superAdmin._id})`);
    return superAdmin;
  } catch (error) {
    logger.error(`Error seeding SuperAdmin: ${error.message}`);
    throw error;
  }
};

// If run directly from the command line: node database/seeds/superAdmin.seeder.js
const run = async () => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    logger.info('Connected to MongoDB for seeding');

    await seedSuperAdmin();

    await mongoose.connection.close();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (error) {
    logger.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

// Check if file is being executed directly
if (process.argv[1]?.endsWith('superAdmin.seeder.js')) {
  run();
}

export default seedSuperAdmin;
