const mongoose = require('mongoose')

/**
 * A MongoDB Schema forces to respect a particular object format.
 * This is the like an Object from a custom class.
 */
const imcSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        weight: { type: Number, required: true },
        height: { type: Number, required: true },
        imc: { type: Number, required: true },
    },
    // schema belongs to the 'imcs' collection
    {
        collection: 'imcs'
    }
)

// Export schema as mongoose model
module.exports = mongoose.model('Imc', imcSchema)