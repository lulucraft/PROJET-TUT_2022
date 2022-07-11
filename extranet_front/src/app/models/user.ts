export class User {
  private _id: number | undefined;
  private _username: string;
  private _password: string;
  // private firstName: string;
  // private lastName: string;
  private _token?: string;

  constructor(id: number | undefined, username: string, password: string) {
    this._id = id;
    this._username = username;
    this._password = password;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public get password(): string {
    return this._password;
  }

  public get token(): string | undefined {
    return this._token;
  }

}
