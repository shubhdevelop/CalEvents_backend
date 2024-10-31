import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { User } from "./user.models.js";

const eventSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: false,
      default: "",
    },
    imgUrl: {
      type: String,
      required: false,
      default: "",
    },
    startDateTime: {
      type: String,
      required: true,
    },
    endDateTime: {
      type: String,
      required: true,
    },
    eventColor: {
      type: String,
      required: false,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export { Event };
