import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';
import { validateString, validationMessages } from '../utils/validations';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isValidString(value) {
              validateString(value, 'Name');
            },
            len: {
              args: [3, 255],
              msg: validationMessages.len('Name', 3, 255),
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: validationMessages.uniqueEmail,
          },
          validate: {
            isEmail: {
              msg: validationMessages.invalidEmail,
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [8, 50],
              msg: validationMessages.len('Password', 8, 50),
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  isValidPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
