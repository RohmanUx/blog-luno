"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsRouter = void 0;
const express_1 = require("express");
const locations_controller_1 = require("../controllers/locations.controller");
class LocationsRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.locationController = new locations_controller_1.LocationsController();
        this.configuration();
    }
    configuration() {
        this.router.get('/location/', this.locationController.get);
    }
    getRouter() {
        return this.router;
    }
}
exports.LocationsRouter = LocationsRouter;
