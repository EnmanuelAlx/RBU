import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

export default {
  async getAll(req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    res.send(users);
  },
  async getById(req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(req.params.id);

    if (!user) {
      res.status(404);
      res.end();
      return;
    }
    res.send(user);
  }
};
