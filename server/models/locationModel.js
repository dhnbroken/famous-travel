import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: {
      type: String,
    },
    type: {
      type: String,
      default: 'Point',
    },
    longitude: { type: Number },
    latitude: { type: Number },
    photoPath: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  },
);

const LocationModel = mongoose.model('Location', LocationSchema);
export default LocationModel;
