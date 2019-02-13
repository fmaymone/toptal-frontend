import axios from "axios";

export default class AuthService {
    constructor(baseUrl) {
        this._client = axios.create({baseURL: baseUrl});
        this._authToken = "";
        this._authenticated = false;
    }

    async signUp(name, email, password, passwordConfirmation) {
        try {
            let response = await this._client.post("/signup", {
                name: name, 
                email: email, 
                password: password, 
                password_confirmation: passwordConfirmation
            });
            this._authenticated = true;
            this._authToken = response.data.auth_token;
            return true;
        }
        catch(ex) {
            return false;
        }
    }

    async login(email, password) {
        let response = await this._client.post("/auth/login", {
            email: email, 
            password: password
        });
        this._authenticated = true;
        this._authToken = response.data.auth_token;
        return this._authToken;
    }

    isAuthenticated() {
        return this._authenticated;
    }
} 