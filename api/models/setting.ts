// const mongoose = require('mongoose');
import {model, Schema, Model, Document } from 'mongoose';

interface ISetting extends Document {
    code: string;
    name: string;
    value: any;
    type: string;
    enabled: boolean;
}

const settingSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    value: {},
    type: { type: String, required: true },
    enabled: { type: Boolean, required: true }
});

export default model<ISetting>('Setting', settingSchema, 'setting');