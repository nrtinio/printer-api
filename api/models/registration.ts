// const mongoose = require('mongoose');
import { model, Schema, Model, Document } from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toObject: {
        virtuals: true
    }
    , toJSON: {
        virtuals: true
    }
};

export interface IRegistration extends Document {
    prefix: string;
    empno: string;
    firstname: string;
    lastname: string;
    middlename: string;
    position: string;
    office_of_appointment: {
        description: string;
        code: string;
    };
    date_of_appointment: Date;
    office_of_assignment: {
        description: string;
        code: string;
    };
    date_of_assignment: Date,
    appt_status: string;
    sg: string;
    mobile: string;
    email: string;
    emerg_name: string;
    emerg_contact: string;
    status: string;
    date_issued: Date;
    valid_until: Date;
    pictorial_date: Date;
    signature: string;
    photo_status: string;
    image_path: string;
    date_uploaded: string;
    creator: Schema.Types.ObjectId;
    id_status: string;
    id_color: string;
    suffix: string;
    last_updated_by: Schema.Types.ObjectId
}

const registrationSchema = new Schema({
    prefix: { type: String },
    empno: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    middlename: { type: String },
    position: { type: String },
    office_of_appointment: {
        description: { type: String },
        code: { type: String }
    },
    date_of_appointment: { type: Date },
    office_of_assignment: {
        description: { type: String },
        code: { type: String }
    },
    date_of_assignment: { type: Date },
    appt_status: { type: String },
    sg: { type: String },
    mobile: { type: String },
    email: { type: String },
    emerg_name: { type: String },
    emerg_contact: { type: String },
    status: { type: String },
    date_issued: { type: Date },
    valid_until: { type: Date },
    pictorial_date: { type: Date },
    signature: { type: String },
    photo_status: { type: String, required: false },
    image_path: { type: String, required: false },
    date_uploaded: { type: String, required: false },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    id_status: { type: String },
    id_color: { type: String },
    suffix: { type: String },
    last_updated_by: {
        type: Schema.Types.ObjectId
    }
}, schemaOptions);

registrationSchema.virtual('name').get(function () {
    return this.lastname + ', ' + this.firstname;
});

export default model<IRegistration>('Registration', registrationSchema, 'registration');
