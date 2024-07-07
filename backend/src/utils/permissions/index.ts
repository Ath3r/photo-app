export default [
    // users
    {
      type: 'user:create',
      description: 'Create a new user',
    },
    {
      type: 'user:update',
      description: 'Update an existing user',
    },
    {
      type: 'user:delete',
      description: 'Delete an existing user',
    },
    {
      type: 'user:readAll',
      description: 'Read all users',
    },
    // posts
    {
      type: 'post:create',
      description: 'Create a new post',
    },
    {
      type: 'post:readAll',
      description: 'Read all posts',
    },
    {
      type: 'post:update',
      description: 'Update an existing post',
    },
    {
      type: 'post:delete',
      description: 'Delete an existing post',
    },
  ]