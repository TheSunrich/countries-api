import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  capital: string;
  flagUrl: string;
}

const CountrySchema = new Schema({
  name: { type: String, required: true },
  capital: { type: String, required: true },
  flagUrl: { type: String, required: true }
});

const Country = mongoose.model('Country', CountrySchema);

export default Country;