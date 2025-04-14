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
  permissions: Permission[];
}

export interface Permission {
  id: string;
  feature_id: string;
  permission_access_id: string;
  feature: Feature;
}

export interface Feature {
  title: string;
}
