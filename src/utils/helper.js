import bcrypt from 'bcrypt';

export default {

  async hash(password) {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    return hashedPassword;
  },

  async compare(password, customerPassword) {
    const compared = await bcrypt.compareSync(password.trim(), customerPassword);
    return compared;
  }

};
