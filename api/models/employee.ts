// const mongoose = require("mongoose");
import {model, Schema, Model, Document } from 'mongoose';

export interface IEmployee extends Document {
    empno: string;
    fname: string;
    mname: string;
    lname: string;
    position: string;
    office_of_appointment: string;
    date_of_appointment: string;
    office_of_assignment: string;
    date_of_assignment: string;
    itemtype: string;
    bday: string;
    sex: string;
    prefix: string;
    id_color: string;
    id_status: string;
    suffix: string;
    valid_until: string;
    last_updated_by: Schema.Types.ObjectId;
    status: string;
}

const employeeSchema = new Schema({
    empno: {
        type: String,
        unique: true,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    office_of_appointment: {
        type: String,
        required: true
    },
    date_of_appointment: {
        type: String,
        required: true
    },
    office_of_assignment: {
        type: String
    },
    date_of_assignment: {
        type: String
    },
    itemtype: {
        type: String
    },
    bday: {
        type: String
    },
    sex: {
        type: String
    },
    prefix: {
        type: String
    },
    id_color: {
        type: String,
        required: true
    },
    id_status: {
        type: String,
        required: true
    },
    suffix: {
        type: String
    },
    valid_until: {
        type: String,
        required: true
    },
    last_updated_by: {
        type: Schema.Types.ObjectId
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
});

export default model<IEmployee>('Employee', employeeSchema, 'employee');