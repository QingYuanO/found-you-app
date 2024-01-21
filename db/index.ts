import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite/next';

export const expoDb = openDatabaseSync('found-you.db');

const db = drizzle(expoDb);

export default db;
