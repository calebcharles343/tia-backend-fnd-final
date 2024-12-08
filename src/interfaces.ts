export interface UserProfileToken {
  email: string;
  password: string;
  token: string;
}

export interface UserProfile {
  email: string;
  password: string;
}

export interface Root {
  token: string;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  active: boolean;
  password_changed_at: any;
  password_reset_token: any;
  password_reset_expires: any;
}

////////////////
//images
////////////////
export interface ImageUrls {
  urls: { url: string; key: string }[]; // Define the expected structure of your response
}

export interface ErrorProps {
  children: React.ReactNode;
}

export interface ImageProps {
  url: { url: string; key: string };
  refetch: () => void;
}

//useMutation
export interface Mutation {
  isLoading: boolean;
  error: string | null;
}

//useQuery
export interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

export interface Headers {
  [key: string]: string;
}
