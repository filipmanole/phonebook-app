import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  AddContactInput,
  Contact,
  DeleteContactInput,
  IQuery,
} from 'src/graphql';
import { ContactService } from './contact.service';

@Resolver('Contact')
export class ContactResolver implements IQuery {
  constructor(private contactService: ContactService) {}

  @Query()
  getContacts(): Contact[] | Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Mutation()
  addContact(@Args('args') args: AddContactInput): Contact | Promise<Contact> {
    console.log('entered...');
    return this.contactService.createContact(args);
  }

  @Mutation()
  deleteContact(
    @Args('args') args: DeleteContactInput,
  ): Contact | Promise<Contact> {
    return this.contactService.deleteContact(args);
  }
}
