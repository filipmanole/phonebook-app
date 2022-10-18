
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AddContactInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export class DeleteContactInput {
    id: string;
}

export class Contact {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export abstract class IQuery {
    abstract getContacts(): Contact[] | Promise<Contact[]>;
}

export abstract class IMutation {
    abstract addContact(args: AddContactInput): Contact | Promise<Contact>;

    abstract deleteContact(args: DeleteContactInput): Contact | Promise<Contact>;
}

type Nullable<T> = T | null;
