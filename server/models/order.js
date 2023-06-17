import mongoose from 'mongoose'
const orderSchema = new moogoose.Schema(
  {
    userId: { type: String },
    listProduct: [],
    totalAmount: { type: Number },
    info: {},
    status: { type: String, default: 'waiting' },
  },
  { timestamps: true },
)

const OrderModel = mongoose.model('order', orderSchema)
export default OrderModel
