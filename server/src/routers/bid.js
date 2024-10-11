import { Router } from "express";
import BidsController from './../controllers/bids';

const bidsRouter = Router();

const bidsController = new BidsController();

bidsRouter.post("/bids", bidsController.createBid);
bidsRouter.put("/bids/:id", bidsController.updateBid);

export default bidsRouter;