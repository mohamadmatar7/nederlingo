import Factory from "./Factory.js";
import DataSource from "../../lib/DataSource.js";
import { faker } from '@faker-js/faker';

class UserMetaFactory extends Factory {
    async make() {
        const userMeta = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            username: faker.internet.userName(),
            avatar: faker.image.avatar()
        };
        const record = await this.insert(userMeta);
        this.inserted.push(record);
        return record;
    }

    async insert(userMeta) {
        const repo = DataSource.getRepository("UserMeta");
        let record = await repo.save(userMeta);
        return record;
    }
}

export default new UserMetaFactory();