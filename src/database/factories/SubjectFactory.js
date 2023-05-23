import Factory from "./Factory.js";
import DataSource from "../../lib/DataSource.js";
import { faker } from '@faker-js/faker';

class SubjectFactory extends Factory {
    async make() {
const subject = {
    name: faker.random.words(),
};
const record = await this.insert(subject);
this.inserted.push(record);
return record;
    }

    async insert(subject) {
        const repo = DataSource.getRepository("Subject");
        let record = await repo.save(subject);
        return record;
    }
}

export default new SubjectFactory();