import { JWTToken } from "./jwt-token";
import { Role } from "./role";

export interface User {
  username: string;
  password: string;
  creationDate?: string;
  roles?: Role[];
  id?: number;
  token?: JWTToken;
}
