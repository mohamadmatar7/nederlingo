import DataSource from "../../lib/DataSource.js";
import Role from "../../models/Role.js";
import Factory from "./Factory.js";

class RoleFactory extends Factory {
    constructor() {
        super();
        this.roles = [
            "Leerling",
            "Lesgever",
            "Begeleider",
            "Directeur",
        ];
    }

    async make() {
        await this.makeMany();
    }

    async makeMany(amount = 1) {
        this.roles.forEach(async (role) => {
            const record = await this.insert(role);
            this.inserted.push(record);
        })
    }

    async insert(label) {
        // console.log("This record will be inserted", label);

        const RoleRepo = DataSource.getRepository("Role");

        let record = await RoleRepo.findOne({where: { label }});
        if (record) return record;

        record = await RoleRepo.save({ label });

        return record;
    }
}

export default new RoleFactory();