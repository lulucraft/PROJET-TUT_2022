import { JWTToken } from "./jwt-token";
import { Role } from "./role";

export interface User {
  // private _id: number | undefined;
  // private _username: string;
  // private _password: string;
  // // private firstName: string;
  // // private lastName: string;
  // private _token?: JWTToken;

  // constructor(id: number | undefined, username: string, password: string) {
  //   this._id = id;
  //   this._username = username;
  //   this._password = password;
  // }

  // public get id(): number | undefined {
  //   return this._id;
  // }

  // public get username(): string {
  //   return this._username;
  // }

  // public get password(): string {
  //   return this._password;
  // }

  // public get token(): JWTToken | undefined {
  //   return this._token;
  // }

  // public setToken(token: JWTToken) {
  //   this._token = token;
  // }

  username: string;
  password: string;
  role?: Role;
  id?: number;
  token?: JWTToken;

}
