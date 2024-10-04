"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRouter = void 0;
const event_controller_1 = require("../controllers/event.controller");
const express_1 = require("express");
class EventRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.eventController = new event_controller_1.EventController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        //Used bind to ensure that "this" inside getEvent, addEvent, and updateEvent points to the EventController instance.
        //When you pass a method as a callback, "this" value may get lost.
        //Using .bind(this.eventController) ensures that the method retains the correct this context when it's called by Express.
        // this.router.get(
        //   '/user-event',
        //   verifyToken,
        //   this.eventController.getUserEvent.bind(this.eventController),
        // );
        //   this.router.get('/events-user/', verifyToken, this.eventController.getEventById);
        //   this.router.get('/events/', this.eventController.getAllEvents);
        //   this.router.post(
        //     '/event',
        //     verifyToken,
        //     uploader('/product', 'EVE').array('eve', 3),
        //     this.eventController.addEvent.bind(this.eventController),
        //   );
        //   this.router.patch(
        //     '/update-event/:eventId',
        //     verifyToken,
        //     uploader('/product', 'EVE').array('eve', 3),
        //     this.eventController.updateEvent.bind(this.eventController),
        //   );
        //   this.router.delete(
        //     '/delete/:eventId',
        //     verifyToken,
        //     this.eventController.deleteEvent,
        //   );
    }
    getRouter() {
        return this.router;
    }
}
exports.EventRouter = EventRouter;
