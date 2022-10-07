import { Inject } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { User } from './user.mongo.entity';

export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  createOrSave(user) {
    return this.userRepository.save(user);
  }
}
