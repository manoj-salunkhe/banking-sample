import mongoose from "mongoose";

interface CustomerAttrs {
  name: string;
  email: string;
  address: string;
  mobile: string;
}

interface CustomerDoc extends mongoose.Document {
  name: string;
  email: string;
  address: string;
  mobile: string;
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

const customerSchema = new mongoose.Schema<CustomerDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true, min: 10, max: 10 },
});

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  "Customer",
  customerSchema
);

export { Customer };
