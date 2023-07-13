import mongoose from 'mongoose';


const usuarioSchema = new mongoose.Schema({
    nombre: String, // String is shorthand for {type: String}
    email: {
        type: String,
        required: [true, 'El correo es  requerido'],
        unique: true

    },
    password: {
        type: String,
        required: true

    },

    admin: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Usuario", usuarioSchema);