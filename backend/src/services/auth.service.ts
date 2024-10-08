import { prisma } from '../db';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../utils/config';
import { encryptPassword, comparePassword } from '../utils/common';
import { CreateUserInput, LoginInput } from '../types';
import defaultPermission from '../utils/permissions/default';

const signup = async (data: CreateUserInput) : Promise<[any| null, string | null]> => {
  const { password } = data;
  const emailAlreadyExists = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (emailAlreadyExists) {
    return [null, 'Email already exists'];
  }
  const hashedPassword = encryptPassword(password);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    },
  });
  // create default roles
  await prisma.role.create({
    data: {
      userId: user.id,
      permissions: {
        create: defaultPermission.map(permission => ({
          type: permission.type,
          description: permission.description,
        })),
      },
    },
  });
  // create jwt token
  const token = jwt.sign({
    id: user.id,
    email: user.email,
  }, AppConfig.JWT_SECRET as string, {
    expiresIn: AppConfig.JWT_EXPIRATION
  });
  const nonPassUser = {
    ...user,
    password: undefined,
  }
  return [{
    token,
    ...nonPassUser
  }, null];
}

const login = async (data: LoginInput) : Promise<[any| null, string | null]> => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: {
        select: {
          id: true,
          permissions: {
            select: {
              type: true,
              description: true,
            }
          }
        }
      }
    }
  });
  if (!user) {
    return [null, 'Invalid email or password'];
  }
  // check password
  const isPasswordCorrect = comparePassword(data.password, user.password);
  if (isPasswordCorrect) {
    // create jwt token
    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, AppConfig.JWT_SECRET as string, {
      expiresIn: AppConfig.JWT_EXPIRATION
    });
    const nonPassUser = {
      ...user,
      password: undefined,
    }
    return [{
      token,
      ...nonPassUser
    }, null];
  }
  return [null, 'Invalid email or password'];
}

export default {
  signup,
  login
};