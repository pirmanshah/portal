export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullname: string;
  role_id: number;
  department_id: number;
  image: {
    id: string;
    url: string;
  } | null;
}
