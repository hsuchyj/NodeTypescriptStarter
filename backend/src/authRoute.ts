import Auth from "./security/auth"; // Auth controller import

export = (app: any) => {
    app.post(process.env.API_BASE + "login", Auth.login);
};
