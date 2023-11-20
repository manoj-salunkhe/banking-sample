import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, min: 10, max: 10 },
  address: { type: String, required: true },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hash = await Password.toHash(this.get("password"))
    this.set('password', hash)
  }
  done()
})

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
