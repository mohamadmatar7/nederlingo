import DataSource from "../../lib/DataSource.js";

export const getAllFeedback = async (req, res, next) => {
    try {
        // get the repository
        const feedbackRepository = DataSource.getRepository("Feedback");
        res.status(200).json(
        await feedbackRepository.find({
            where: { id: null },
            relations: ["users"],
        })
        );
    } catch (e) {
        next(e.message);
    }
    };

export const getFeedback = async (req, res, next) => {
    try {
        // get the repository
        const feedbackRepository = DataSource.getRepository("Feedback");
        res.status(200).json(
        await feedbackRepository.findOne({
            where: { id: req.params.id },
            relations: ["users"],
        })
        );
    } catch (e) {
        next(e.message);
    }
    };

export const postFeedback = async (req, res, next) => {
    try {
        // get the repository
        const feedbackRepository = DataSource.getRepository("Feedback");
        const feedback = await feedbackRepository.create(req.body);
        await feedbackRepository.save(feedback);
        res.status(200).json(feedback);
    }
    catch (e) {
        next(e.message);
    }
    };

export const updateFeedback = async (req, res, next) => {
    try {
        // get the repository
        const feedbackRepository = DataSource.getRepository("Feedback");
        const feedback = await feedbackRepository.findOne({
        where: { id: req.params.id },
        });
        feedbackRepository.merge(feedback, req.body);
        await feedbackRepository.save(feedback);
        res.status(200).json(feedback);
    } catch (e) {
        next(e.message);
    }
    };

export const deleteFeedback = async (req, res, next) => {
    try {
        const feedbackRepository = DataSource.getRepository("Feedback");
        
        const { id } = req.params;
        const Feedback = await feedbackRepository.findOneBy({ id: id });
        await feedbackRepository.remove(Feedback);
        res.status(200).json(`the feedback with id:${id} has been deleted`);
    } catch (e) {
        next(e.message);
    }
    };
