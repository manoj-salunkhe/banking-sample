import mongoose from "mongoose";
import { ACCOUNT_TYPE, ROLE } from "../../../common/src";

// MOVE THIS USERATTRS interface accordingly

interface UserAttrs {
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  role: ROLE;
}

interface AccountAttrs {
  accountNumber: string;
  userId: UserAttrs;
  balance: string;
  accountType: ACCOUNT_TYPE;
}

interface AccountDoc extends mongoose.Document {
  accountNumber: string;
  userId: UserAttrs;
  balance: string;
  accountType: ACCOUNT_TYPE;
}

interface AccountModel extends mongoose.Model<AccountDoc> {
  build(attrs: AccountAttrs): AccountDoc;
}

const accountSchema = new mongoose.Schema<AccountDoc>({
  accountNumber: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: { type: String },
  accountType: {
    type: String,
    enum: Object.values(ACCOUNT_TYPE),
    required: true,
  },
});

accountSchema.statics.build = (attrs: AccountAttrs) => {
  return new Account(attrs);
};

const Account = mongoose.model<AccountDoc, AccountModel>(
  "Account",
  accountSchema
);

export { Account };
