import { UserRepository } from './user.entity';

async function createUserService() {
  return {
    async getUserWithPasswordHashByEmail(email: string) {
      const userEntity = await UserRepository.findOne({ email }).exec();
      return userEntity;
    }
  };
}

export { createUserService };
