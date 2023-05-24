import DataSource from "../../lib/DataSource.js";
import Factory from "./Factory.js";

class FeebackFactory extends Factory {
    constructor() {
        super();
        this.feedback = [
            "Good",
            "Okay",
            "Bad",
            "Very Bad",
        ];
    }

    async make() {
        await this.makeMany();
    }

    async makeMany(amount = 1) {
        this.feedback.forEach(async (content) => {
            const record = await this.insert(content);
            this.inserted.push(record);
        })
    }

    async insert(content) {
        // console.log("This record will be inserted", content);

        const FeedRepo = DataSource.getRepository("Feedback");

        let record = await FeedRepo.findOne({where: { content }});
        if (record) return record;

        record = await FeedRepo.save({ content });

        return record;
    }
}

export default new FeebackFactory();