import Dexie from "dexie";

export const db = new Dexie("morgen-lite");

db.version(1).stores({
  events: "++id, start, end",
  todos: "++id, createdAt",
});
