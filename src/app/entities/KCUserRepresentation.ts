export class KCUserRepresentation {
    self: object;
    id: string;
    origin: string;
    createdTimestamp: number;
    username: string;
    enabled: boolean;
    totp: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
    federationLink: string;
    serviceAccountClientId: string;
    attributes: {
        UF: string[],
        TIPO: string[],
        ENTIDADE: string[]
    };
    credentials: string;
    disableableCredentialTypes: string[];
    requiredActions: string[];
    federatedIdentities: string;
    realmRoles: string;
    clientRoles: string;
    clientConsents: string;
    notBefore: number;
    applicationRoles: string;
    socialLinks: string;
    groups: string;
    access: {
        manageGroupMembership: boolean;
        view: boolean;
        mapRoles: boolean;
        impersonate: boolean;
        manage: boolean;
    };
}
