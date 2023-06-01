import Factory from "./Factory.js";
import DataSource from "../../lib/DataSource.js";
import { faker } from '@faker-js/faker';

class UserMetaFactory extends Factory {
    async make() {
        const userMeta = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            username: faker.internet.userName(),
            avatar: faker.image.avatar(),
            birthday: faker.date.past(),
            gender: faker.helpers.arrayElement(['Man', 'Vrouw']),
            religion: faker.helpers.arrayElement(['Moslim', 'Christen', 'Jood', 'Atheist',]),
            birthplace: faker.address.city() + ', ' + faker.address.country(),
            parent: faker.name.firstName() + ' ' + faker.name.lastName(),
            family: faker.helpers.arrayElement(['Gehuwd', 'Samenwonend', 'Single']),
            bankpreference: faker.helpers.arrayElement(['Post', 'Email']),
            transport: faker.helpers.arrayElement(['Te voet', 'Bus', 'Auto', 'Fiets']),
            phone: faker.phone.number(),
            address: faker.address.streetAddress(),
            nationality: faker.address.country(),
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