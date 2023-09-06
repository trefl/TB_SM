import Worker from "../models/WorkerModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getWorkers = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Worker.findAll({
                attributes: ['uuid', 'name', 'surname'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Worker.findAll({
                attributes: ['uuid', 'name', 'surname'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });

        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!worker) return res.status(404).json({ msg: "Data not found" })
        let response;
        if (req.role === "admin") {
            response = await Worker.findOne({
                attributes: ['uuid', 'name', 'surname'],
                where: {
                    id: worker.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await Worker.findOne({
                attributes: ['uuid', 'name', 'surname'],
                where: {
                    [Op.and]: [{ id: worker.id }, { userId: req.userId }]
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createWorker = async (req, res) => {
    const { name, surname } = req.body;
    try {
        await Worker.create({
            name: name,
            surname: surname,
            userId: req.userId
        });
        res.status(201).json({ msg: "Worker created Successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateWorker = async (req, res) => {
    try {
        const worker = await Worker.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!worker) return res.status(404).json({ msg: "Data not found" })
        const {name, surname} = req.body;
        if (req.role === "admin") {
            await Worker.update({name, surname},{
                where:{
                    id: worker.id
                }
            });
        } else {
            if(req.userId !== worker.userId) return res.status(403).json({msg: "Forbidden access"});
            await Worker.update({name, surname},{
                where: {
                    [Op.and]: [{ id: worker.id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({msg: "Worker updated successfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const deleteWorker = async(req, res) => { 
    try {
        const worker = await Worker.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!worker) return res.status(404).json({ msg: "Data not found" })
        const {name, surname} = req.body;
        if (req.role === "admin") {
            await Worker.destroy({
                where:{
                    id: worker.id
                }
            });
        } else {
            if(req.userId !== worker.userId) return res.status(403).json({msg: "Forbidden access"});
            await Worker.destroy({
                where: {
                    [Op.and]: [{ id: worker.id }, { userId: req.userId }]
                },
            });
        }
        res.status(200).json({msg: "Worker deleted successfully"});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
