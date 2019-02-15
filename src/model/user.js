export default class Role {
  static ROLE_ADMIN = "admin";
  static ROLE_REGULAR = "regular";
}

class User {
  constructor() {
    this._id = -1;
    this._name = "";
    this._email = "";
    this._role = "";
  }

  constructor(id, name, email, role) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._role = role;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get role() {
    return this._role;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      role: this._role
    }
  }
}