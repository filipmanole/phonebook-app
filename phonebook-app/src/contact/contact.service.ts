import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddContactInput,
  DeleteContactInput,
  Contact,
  UpdateContactInput,
} from 'src/graphql';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  createContact(addContactInput: AddContactInput): Promise<Contact> {
    const contact = new this.contactModel(addContactInput);

    return contact.save();
  }

  findAll() {
    return this.contactModel.find().exec();
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findOne({ _id: id }).exec();
    if (!contact) {
      throw new NotFoundException(`Contact ${id} not found`);
    }
    return contact;
  }

  async updateContact({
    id,
    firstName,
    lastName,
    phoneNumber,
  }: UpdateContactInput): Promise<Contact> {
    const existingContact = await this.contactModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { firstName, lastName, phoneNumber } },
        { new: true },
      )
      .exec();

    if (!existingContact) {
      throw new NotFoundException(`Contact ${id} not found`);
    }
    return existingContact;
  }

  async deleteContact(
    deleteContactInput: DeleteContactInput,
  ): Promise<Contact> {
    const contact = await this.findOne(deleteContactInput.id);
    return contact.remove();
  }
}
