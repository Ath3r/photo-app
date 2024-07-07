import { Request } from 'express'



export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserJwt {
  id: number;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface RequestWithUser extends Request {
  user: User;
  token: any;
}

export interface Role {
  id: number;
  permissions: Permission[];
}

export interface Permission {
  type: string;
  description: string;
}

export interface Session {
  id: number;
  userId: number;
  token: string;
}

export interface Post {
  id: number;
  description: string;
  url: string;
  userId: number;
}

export interface CreatePostInput {
  description: string;
  url: string;
}