interface Post {
  id: number;
  url: string;
  description: string;
  createdAt: Date;
}

interface Permission {
  description: string;
  type: string;
}

interface Role {
  id: number;
  permissions: Permission[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}