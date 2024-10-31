import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/events.models.js";

const getUserEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ owner: req.user.uid });

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const createEvent = asyncHandler(async (req, res) => {
  const {
    eventTitle,
    eventDescription,
    startDateTime,
    endDateTime,
    eventColor,
  } = req.body;

  console.log(req.body);
  //   console.log(req.user.uid);

  if (!eventTitle || !startDateTime || !endDateTime) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const event = await Event.create({
    eventTitle,
    eventDescription,
    startDateTime,
    endDateTime,
    eventColor,
    imgUrl: req.user.picture,
    owner: req.user.uid,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.owner.toString() !== req.user.uid.toString()) {
    throw new ApiError(403, "Unauthorized to delete this event");
  }

  await Event.findByIdAndDelete(eventId);

  return res
    .status(204)
    .json(new ApiResponse(204, {}, "Event deleted successfully"));
});

const updateEvent = asyncHandler(async (req, res) => {
  const {
    _id,
    eventTitle,
    eventDescription,
    startDateTime,
    endDateTime,
    eventColor,
  } = req.body;

  if (!_id) {
    throw new ApiError(400, "Event ID is required");
  }

  const event = await Event.findById(_id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.owner.toString() !== req.user.uid.toString()) {
    throw new ApiError(403, "Unauthorized to update this event");
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    {
      $set: {
        eventTitle: eventTitle || event.eventTitle,
        eventDescription: eventDescription || event.eventDescription,
        startDateTime: startDateTime || event.startDateTime,
        endDateTime: endDateTime || event.endDateTime,
        eventColor: eventColor || event.eventColor,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
});

export { getUserEvents, createEvent, deleteEvent, updateEvent };
