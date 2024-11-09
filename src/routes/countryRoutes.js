"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const countryController_1 = require("../controllers/countryController");
const router = express_1.default.Router();
router.get("", countryController_1.listCountries); // Endpoint para listar países
router.post("", countryController_1.addCountry); // Endpoint para agregar un nuevo país
exports.default = router;
