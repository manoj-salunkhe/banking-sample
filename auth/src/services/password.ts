import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (err) {
      console.log(err);
    }
  }

  static async compare(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<Boolean> {
    const isPasswordCorrect = await bcrypt.compare(
      suppliedPassword,
      storedPassword
    );
    return isPasswordCorrect;
  }
}
