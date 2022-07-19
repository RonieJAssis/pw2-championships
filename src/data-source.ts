import "reflect-metadata";
import { DataSource } from "typeorm";
import { Championship } from "./entity/Championship";

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: [Championship],
  migrations: [],
  subscribers: [],
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
