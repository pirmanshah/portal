export type User = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  department: {
    title: string;
  };
  role: {
    type: string;
  };
};
