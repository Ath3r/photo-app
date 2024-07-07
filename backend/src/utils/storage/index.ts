import upload from './multer';

export default (type: string) => {
  switch (type) {
    case 'local':
      return upload;
    default:
      return upload;
  }
};