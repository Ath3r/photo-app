import { prisma } from '../db';
import { CreatePostInput } from '../types';

const getAllPosts = async (
  userId: number,
  canViewAllPosts: boolean = false,
  sort: object = {
    createdAt: 'desc',
  },
) : Promise<[any| null, string | null]> => {
  const query: any = {};
  if (!canViewAllPosts) {
    query.userId = userId;
  }
  const posts = await prisma.post.findMany({
    where: query,
    orderBy : [
      sort,
    ],
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
  });
  return [posts, null];
};

const createPost = async (data: CreatePostInput, userId: number) : Promise<[any| null, string | null]> => {
  const { description, url } = data;
  const post = await prisma.post.create({
    data: {
      description,
      url,
      userId,
    },
    select: {
      id: true,
      description: true,
      url: true,
    },
  });
  return [post, null];
};

const updatePost = async (id: number, data: CreatePostInput) : Promise<[any| null, string | null]> => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      description: true,
      url: true,
    },
  });
  return [post, null];
};

const deletePost = async (id: number) : Promise<[any| null, string | null]> => {
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  return [post, null];
};

const getProfile = async (id: number) : Promise<[any| null, string | null]> => {
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      description: true,
      url: true,
    },
  });
  return [post, null];
};

export default {
  getAllPosts,
  getProfile,
  createPost,
  updatePost,
  deletePost
};
