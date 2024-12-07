import { Schema } from 'mongoose';

export interface IStatus {
    name: string;
    description: string;
    color: string;
    isActive: boolean;
}

export const StatusSchema: Schema = new Schema<IStatus>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
});