import "dotenv/config";
import DatabaseSeeder from "./DatabaseSeeder.js";
import entities from '../../lib/DataSource.js';
import UserFactory from "../factories/UserFactory.js";

const dbSeeder = new DatabaseSeeder(
    process.env.DATABASE_TYPE,
    process.env.DATABASE_URL,
    entities
);

dbSeeder.run(UserFactory, 10).then((record) => {
    console.log("inserted", record);
})