import { prisma } from '../db';
import { encryptPassword } from '../utils/common';
import { CreateUserInput } from '../types';
import defaultPermission from '../utils/permissions/default';

const getAll = async (): Promise<[any | null, string | null]> => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          id: true,
          permissions: {
            select: {
              type: true,
              description: true
            }
          }
        }
      }
    }
  });
  return [users, null];
};

const createUser = async (data: CreateUserInput): Promise<[any | null, string | null]> => {
  const { password } = data;
  const emailAlreadyExists = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  });
  if (emailAlreadyExists) {
    return [null, 'Email already exists'];
  }
  const hashedPassword = encryptPassword(password);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    }
  });
  await prisma.role.create({
    data: {
      userId: user.id,
      permissions: {
        create: defaultPermission.map(permission => ({
          type: permission.type,
          description: permission.description
        }))
      }
    }
  });
  return [user, null];
};

const updateUser = async (id: number, data: any): Promise<[any | null, string | null]> => {
  const { role, ...userData } = data;
  const updatedUser = await prisma.$transaction(async prisma => {
    const user = await prisma.user.update({
      where: { id },
      data: userData,
      include: {
        role: {
          include: {
            permissions: true
          }
        }
      }
    });

    if (role && role.permissions) {
      await prisma.role.update({
        where: { id: (user.role as any).id },
        data: {
          permissions: {
            deleteMany: {},
            create: role.permissions.map((permission: any) => ({
              type: permission.type,
              description: permission.description
            }))
          }
        }
      });
      const updatedUserWithPermissions = await prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: true
            }
          }
        }
      });
      return updatedUserWithPermissions;
    }
    return user;
  });
  return [updatedUser, null];
};

const deleteUser = async (id: number): Promise<[any | null, string | null]> => {
  const user = await prisma.user.delete({
    where: {
      id
    }
  });
  return [user, null];
};

const getProfile = async (id: number): Promise<[any | null, string | null]> => {
  const user = await prisma.user.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          id: true,
          permissions: {
            select: {
              type: true,
              description: true
            }
          }
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });
  return [user, null];
};

const updateProfile = async (id: number, data: CreateUserInput): Promise<[any | null, string | null]> => {
  const user = await prisma.user.update({
    where: {
      id
    },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      role: {
        select: {
          id: true,
          permissions: {
            select: {
              type: true,
              description: true
            }
          }
        }
      }
    }
  });
  return [user, null];
};

export default {
  getAll,
  getProfile,
  updateProfile,
  createUser,
  updateUser,
  deleteUser
};
