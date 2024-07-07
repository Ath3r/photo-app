import { PrismaClient } from '@prisma/client';

import permissions from '../src/utils/permissions';
import { encryptPassword } from '../src/utils/common';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  // check if permissions already exists
  const permissionsExists = await prisma.permission.findMany({
    where: {
      type: {
        in: permissions.map(permission => permission.type),
      },
    },
    select: {
      id: true,
      type: true,
    },
  });

  if (permissionsExists.length === permissions.length) {
    console.log('Permissions already exists');
    return;
  }

  const permissionsToCreate = permissions.filter(permission => !permissionsExists.find(
    (p: any) => p.type === permission.type));
  await prisma.permission.createMany({
    data: permissionsToCreate.map(permission => ({
      type: permission.type,
      description: permission.description,
    })),
  });

  // check if admin user already exists
  let adminUser = await prisma.user.findFirst({
    where: {
      email: 'admin@admin.com',
    },
    select: {
      id: true,
    },
  });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@admin.com',
        password: encryptPassword('123456'),
      },
    });
  }

  // check if admin role already exists
  let adminRole = await prisma.role.findFirst({
    where: {
      userId: adminUser.id,
      permissions: {
        some: {
          type: {
            in: permissions.map(permission => permission.type),
          },
        },
      },
    },
    select: {
      id: true,
    },
  });
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        userId: adminUser.id,
        permissions: {
          create: permissions.map(permission => ({
            type: permission.type,
            description: permission.description,
          })),
        },
      },
    });
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});