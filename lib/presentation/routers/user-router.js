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
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
function UserRouter(userUseCaseImpl, authMiddleware) {
    const router = express_1.default.Router();
    router.get('/', authMiddleware.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const contacts = yield userUseCaseImpl.getAllUsers();
            res.send(contacts);
        }
        catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    }));
    router.get('/email/:email', authMiddleware.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userUseCaseImpl.getUserByEmail(req.params.email);
            res.status(http_status_1.default.OK).json(response);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.get('/id/:id', authMiddleware.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userUseCaseImpl.getUserById(Number(req.params.id));
            res.status(http_status_1.default.OK).json(response);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userUseCaseImpl.createUser(req.body);
            res.status(http_status_1.default.CREATED).json(response);
        }
        catch (err) {
            next(err);
        }
    }));
    router.put('/id/:id', authMiddleware.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userUseCaseImpl.updateUserById(Number(req.params.id), req.body);
            res.status(http_status_1.default.OK).json(response);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.delete('/id/:id', authMiddleware.authenticate, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userUseCaseImpl.deleteUserById(Number(req.params.id));
            res.status(http_status_1.default.OK).json(response);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    return router;
}
exports.default = UserRouter;
