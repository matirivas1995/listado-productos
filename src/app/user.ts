export interface Roles {
    usuario: boolean;
    administrador?: boolean;
    duenho?:boolean;
}

export class User {
    email:string;
    roles:Roles;

    constructor(authData) {
        this.email = authData.email
        this.roles = { usuario: true}
    }
}
