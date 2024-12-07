"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.changeStatus = exports.updateNote = exports.addNote = exports.listNotesById = exports.listNotes = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const mongoose_1 = __importDefault(require("mongoose"));
const listNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.query;
    try {
        if (title || content) {
            const notes = yield Note_1.default.find({
                title: title ? { $regex: new RegExp(title, 'i') } : { $exists: true },
                content: content ? { $regex: new RegExp(content, 'i') } : { $exists: true },
            });
            res.json(notes);
            return;
        }
        const notes = yield Note_1.default.find();
        res.json(notes);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.listNotes = listNotes;
const listNotesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    try {
        const note = yield Note_1.default.findById(id);
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.listNotesById = listNotesById;
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, } = req.body;
    if (!title || !content) {
        res.status(400)
            .json({ message: 'Attributes are missing' });
        return;
    }
    try {
        const newNote = new Note_1.default({
            title,
            content
        });
        yield newNote.save();
        res.json(newNote);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.addNote = addNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400)
            .json({ message: 'Attributes are missing' });
        return;
    }
    try {
        const note = yield Note_1.default.findByIdAndUpdate(id, {
            title,
            content
        }, { new: true });
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.updateNote = updateNote;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    const { status } = req.body;
    if (!status) {
        res.status(400)
            .json({ message: 'Status is missing' });
        return;
    }
    try {
        const note = yield Note_1.default.findByIdAndUpdate(id, { status }, { new: true });
        res.json(note);
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.changeStatus = changeStatus;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: 'Invalid ID' });
        return;
    }
    try {
        yield Note_1.default.findByIdAndDelete(id);
        res.json({ message: 'Note deleted' });
    }
    catch (error) {
        res.status(500)
            .json({ message: error });
    }
});
exports.deleteNote = deleteNote;
