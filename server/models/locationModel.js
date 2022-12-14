import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: {
      type: String,
    },
    longitude: { type: Number },
    latitude: { type: Number },
  },
  {
    timestamps: true,
  },
);

const LocationModel = mongoose.model('Location', LocationSchema);
export default LocationModel;
