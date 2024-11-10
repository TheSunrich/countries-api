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
exports.addCountry = exports.listCountries = void 0;
const Country_1 = __importDefault(require("../models/Country"));
const listCountries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countries = yield Country_1.default.find();
        res.status(200).json(countries);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al listar los países' });
    }
});
exports.listCountries = listCountries;
const addCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capital, flagUrl } = req.body;
    if (!name || !capital || !flagUrl) {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
        return;
    }
    try {
        const newCountry = new Country_1.default({ name, capital, flagUrl });
        const savedCountry = yield newCountry.save();
        res.status(201).json(savedCountry);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al agregar el país' });
    }
});
exports.addCountry = addCountry;
