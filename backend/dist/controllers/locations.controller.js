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
exports.LocationsController = void 0;
const prisma_1 = __importDefault(require("../prisma")); // Adjust this path as necessary based on your project structure
class LocationsController {
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield prisma_1.default.location.findMany({
                    select: {
                        locationName: true,
                        id: true,
                        event: {
                            select: {
                                categoryId: true,
                                id: true,
                                title: true,
                                location: {
                                    select: {
                                        id: true,
                                        locationName: true,
                                    }
                                },
                                category: {
                                    select: {
                                        id: true,
                                        categoryName: true
                                    }
                                },
                                images: {
                                    select: {
                                        id: true,
                                        path: true,
                                        eventId: true,
                                    },
                                },
                                description: true,
                                totalSeats: true,
                                price: true,
                                ticketType: true,
                                startTime: true,
                                endTime: true,
                                isDeleted: true,
                            },
                        },
                    },
                });
                // Send the retrieved locations with status 200
                res.status(200).json(locations);
            }
            catch (error) {
                console.error('Error fetching locations:', error);
                // Send a 500 response if an error occurs
                res.status(500).json({ error: 'Error fetching locations' });
                // Optionally, pass the error to the next middleware
                next(error);
            }
        });
    }
}
exports.LocationsController = LocationsController;
