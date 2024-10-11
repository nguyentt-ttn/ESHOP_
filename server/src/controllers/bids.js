import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import Product from "../models/product";
import Bid from "../models/bid";

class BidsController {
  async createBid(req, res, next) {
    try {
      const currentTime = new Date();
    if (currentTime > new Date(Product.endAt)) {
      return res.status(400).json({ message: 'Hết giờ đấu giá!' });
    }

      const newBid = await Bid.create(req.body);
      
      await Product.findByIdAndUpdate(req.body.product, {
        bids: [...req.body.bids, newBid._id],
        bidPriceMax:
          req.body.price > req.body.bidPriceMax
            ? req.body.price
            : req.body.bidPriceMax,
      });
      res.status(StatusCodes.CREATED).json({
        message: "Create Bid Successfull",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBid(req, res, next) {
    try {
      console.log(req.body);
      const updateBid = await Bid.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateBid) throw new ApiError(404, "Bid Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Bid Successfull",
        data: updateBid,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BidsController;