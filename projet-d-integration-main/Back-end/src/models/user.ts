import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const Schema = new mongoose.Schema(
    {
        name: {
            type: String ,
            required: true
        },
        email: {
            type: String ,
            required: true
        },
        password: {
            type: String ,
            required: true
        },
        approuve:{
            type:Boolean,
            default:false
        },
        role: {
            type: String ,
            default: 'responsable'
        },
    }
);

Schema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 9)
})

export default mongoose.model("User", Schema);