const { AppDataSource } = require("../config/db");
const Contact = require("../entities/Contact");
const { ILike, In } = require("typeorm");
const getAge = require("../utils/helpers");

const contactRepository = AppDataSource.getRepository(Contact);

const contactService = {
  getAllContacts: () => {
    return contactRepository.find();
  },

  getContactById: (id) => {
    if (!id) {
      return Promise.reject(new Error("id parameter is required"));
    }

    return contactRepository.findOne({ where: { id } });
  },

  getContactsByLocation: (location) => {
    if (!location) {
      return Promise.reject(new Error("Location parameter is required"));
    }

    return contactRepository.find({
      where: [
        { city: ILike(`%${location}%`) },
        { state: ILike(`%${location}%`) },
      ],
    });
  },

  searchContacts: (query) => {
    if (!query) {
      return Promise.reject(new Error("Search query is required"));
    }

    return contactRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
        { company: ILike(`%${query}%`) },
        { phone: ILike(`%${query}%`) },
        { address: ILike(`%${query}%`) },
        { city: ILike(`%${query}%`) },
        { state: ILike(`%${query}%`) },
      ],
    });
  },

  createContact: (data) => {
    const contact = contactRepository.create(data);
    return contactRepository.save(contact);
  },

  updateContact: (id, data) => {
    if (!id || !data) {
      return Promise.reject(new Error("ID and DATA are required"));
    }

    return contactRepository.findOne({ where: { id } }).then((contact) => {
      if (!contact) {
        throw new Error(`Contact with ID ${id} not found`);
      }

      Object.assign(contact, data);
      // return contactRepository.save(contact);
      return contactRepository.save(contact).catch((error) => {
        throw new Error(`Failed to update contact: ${error.message}`);
      });
    });
  },

  notifyContacts: (contactIds, emailTemplate) => {
    return new Promise((resolve, reject) => {
      contactRepository
        //EN ESTE CASO SE LE PASAN IDS POR PAYLOAD, PERO SE PODRIA HACER DIRECTAMENTE EN EL WHERE {birthdate: today} habiendo seteado la variable today
        .find({ where: { id: In(contactIds) } })
        .then((contacts) => {
          console.log("CONTACTS: ", contacts);
          contacts.forEach((contact) => {
            let age = getAge(contact.birthdate);

            const emailContent = emailTemplate
              .replace("<contact_name>", contact.name)
              .replace("<age>", age);

            console.log("-------------------------------------------------");
            console.log(`📧 Sending email to: ${contact.email}`);
            console.log(`📩 Email content: ${emailContent}`);
            console.log("-------------------------------------------------");
          });
          resolve()
        })
        .catch((error) => console.error("Error fetching contacts: ", error));
    })
  },

  deleteContact: (id) => {
    if (!id) {
      return Promise.reject(new Error("ID id required"));
    }

    return contactRepository.delete(id);
  },
};

module.exports = contactService;
