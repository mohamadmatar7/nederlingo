import DataSource from "../../lib/DataSource.js";
import Role from "../../models/Role.js";
import Factory from "./Factory.js";

class ClassFactory extends Factory {
    constructor() {
        super();
        this.classes = [
            "A1",
            "B1",
            "C1",
        ];
    }

    async make() {
        await this.makeMany();
    }

    async makeMany(amount = 1) {
        this.classes.forEach(async (course) => {
            const record = await this.insert(course);
            this.inserted.push(record);
        })
    }

    async insert(label) {
        // console.log("This record will be inserted", label);

        const ClassRepo = DataSource.getRepository("Class");

        let record = await ClassRepo.findOne({where: { label }});
        if (record) return record;

        record = await ClassRepo.save({ label });

        return record;
    }
}

export default new ClassFactory();