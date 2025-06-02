import { Types, Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const StudentSchema = new Schema(
  {
    names: {
      type: String,
      required: true,
    },
    lastnames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    ci: {
      type: String,
      required: true,
    },
    currentSession: {
      type: String,
      required: true,
    },
    currentCourse: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['M', 'F'],
      required: true,
    },
    parents: {
      type: Types.ObjectId,
      ref: 'Parent',
    },
    notes: {
      type: Types.ObjectId,
      ref: 'Note',
    },
    birthday: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    placeOfBirth: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)
StudentSchema.plugin(mongoosePaginate)
const Student = model('Student', StudentSchema)
export default Student
