import Factory from "./Factory.js";
import DataSource from "../../lib/DataSource.js";
import RoleFactory from "./RoleFactory.js";
import ClassFactory from "./ClassFactory.js";
import SubjectFactory from "./SubjectFactory.js"
import UserMetaFactory from "./UserMetaFactory.js";
import { faker } from '@faker-js/faker'

class UserFactory extends Factory {
    constructor() {
        super();
        this.roles = RoleFactory.roles;
        this.classes = ClassFactory.classes;
    }

    async make() {
        const randomIndex = Math.floor(Math.random() * this.roles.length);
        const randomRole = this.roles[randomIndex];
        const randomClass = this.classes[randomIndex];

        const userMeta = await UserMetaFactory.make();
        const subjects = await SubjectFactory.make();
    
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: randomRole,
            meta: userMeta,
            class: randomClass,
            subjects: [subjects]
        };
    
        const record = await this.insert(user, randomRole, randomClass, [subjects]);
        this.inserted.push(record);
        return record;
    }      
    
    async makeMany(amount) {
        for (let i = 0; i < amount; i++) {
            await this.make();
        }
    }      

    async insert(user, role, classes, subjects ) {
        const repo = DataSource.getRepository("User");
    
        let record = await repo.findOne({where: {email: user.email}});
        if (record) return record;
    
        const roleRecord = await RoleFactory.insert(role);
        const classRecord = await ClassFactory.insert(classes);
        record = await repo.save({
            ...user,
            role: roleRecord,
            meta: user.meta,
            class: classRecord,
            subjects: subjects
        });
    
        return record;
    }    
}

export default new UserFactory();