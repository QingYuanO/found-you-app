import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const baseColumn = {
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updatedAt').default(sql`CURRENT_TIMESTAMP`),
};

/**
 * 房间
 */
export const roomTable = sqliteTable('room', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  ...baseColumn,
});

export const roomTableRelations = relations(roomTable, ({ one, many }) => ({
  containers: many(containerTable),
}));
/**容器 */
export const containerTable = sqliteTable('container', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  cover: text('cover'),
  identifier: text('identifier', { length: 4 }),
  roomId: integer('room_id')
    .references(() => roomTable.id)
    .notNull(),
  ...baseColumn,
});

export const containerTableRelations = relations(containerTable, ({ one, many }) => ({
  room: one(roomTable, {
    fields: [containerTable.id],
    references: [roomTable.id],
  }),
  stuffs: many(stuffTable),
}));

/**物件 */
export const stuffTable = sqliteTable('stuff', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  cover: text('cover'),
  containerId: integer('container_id')
    .references(() => containerTable.id)
    .notNull(),
  ...baseColumn,
});

export const stuffTableRelations = relations(stuffTable, ({ one, many }) => ({
  container: one(containerTable, {
    fields: [stuffTable.id],
    references: [containerTable.id],
  }),
}));

export const selectRoomSchema = createSelectSchema(roomTable);
const insertRoomSchema = createInsertSchema(roomTable);
export type Room = z.infer<typeof selectRoomSchema>;
export type RequestRoom = z.infer<typeof insertRoomSchema>;
export const ROOM_TYPE = [
  'bedroom',
  'living_room',
  'kitchen',
  'toilet',
  'study',
  'common_room',
] as const;
export const RoomTypeEnum = z.enum(ROOM_TYPE);
