const { createConnection, getRepository } = require("typeorm");
const Contact = require("../src/entities/Contact");

const contacts = [
  {
    name: "Maximiliano",
    company: "laNacion",
    profile_image: "",
    email: "maximilminu@gmail.com",
    birthdate: "1994-10-12",
    phone: "1122336655",
    address: "Calle Siempre Viva 123",
    city: "Nueva Pompeya",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Roberto",
    company: "laNacion",
    profile_image: "",
    email: "roberto@gmail.com",
    birthdate: "1980-02-04",
    phone: "1155667788",
    address: "Avenida Corrientes 456",
    city: "Balvanera",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Maria",
    company: "laNacion",
    profile_image: "",
    email: "maria@gmail.com",
    birthdate: "1990-07-15",
    phone: "1199887766",
    address: "Calle Florida 789",
    city: "San Nicolás",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Carlos",
    company: "laNacion",
    profile_image: "",
    email: "carlos@gmail.com",
    birthdate: "1985-11-22",
    phone: "1144556677",
    address: "Avenida Rivadavia 1011",
    city: "Monserrat",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Laura",
    company: "laNacion",
    profile_image: "",
    email: "laura@gmail.com",
    birthdate: "1992-03-30",
    phone: "1133445566",
    address: "Calle Scalabrini Ortiz 1213",
    city: "Monserrat",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Javier",
    company: "laNacion",
    profile_image: "",
    email: "javier@gmail.com",
    birthdate: "1988-09-18",
    phone: "1166778899",
    address: "Avenida Santa Fe 1415",
    city: "Recoleta",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Ana",
    company: "laNacion",
    profile_image: "",
    email: "ana@gmail.com",
    birthdate: "1995-05-25",
    phone: "1122334455",
    address: "Calle Paraguay 1617",
    city: "Retiro",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Diego",
    company: "laNacion",
    profile_image: "",
    email: "diego@gmail.com",
    birthdate: "1983-12-10",
    phone: "1188997766",
    address: "Avenida Belgrano 1819",
    city: "Monserrat",
    state: "Misiones",
  },
  {
    name: "Sofia",
    company: "laNacion",
    profile_image: "",
    email: "sofia@gmail.com",
    birthdate: "1998-08-05",
    phone: "1144332211",
    address: "Calle Lavalle 2021",
    city: "San Telmo",
    state: "Ciudad de Buenos Aires",
  },
  {
    name: "Luis",
    company: "laNacion",
    profile_image: "",
    email: "luis@gmail.com",
    birthdate: "1987-04-14",
    phone: "1177665544",
    address: "Avenida Pueyrredón 2223",
    city: "Villa Crespo",
    state: "Misiones",
  },
];

const retryConnection = (retries = 5, delay = 5000) => {
  return new Promise((resolve, reject) => {
    const attemptConnection = (attempt) => {
      createConnection()
        .then(() => {
          console.log("Database connection established!");
          resolve();
        })
        .catch((error) => {
          if (attempt < retries) {
            console.error(`Connection attempt ${attempt + 1} failed:`, error.message);
            console.log(`Retrying in 5 seconds...`);
            setTimeout(() => attemptConnection(attempt + 1), delay);
          } else {
            console.error("Failed to connect to the database after multiple attempts");
            reject(error);
          }
        });
    };

    attemptConnection(0);
  });
};

retryConnection()
  .then(() => {
    const contactRepository = getRepository(Contact);

    return contactRepository
      .find()
      .then((existingContacts) => {
        if (existingContacts.length === 0) {
          return Promise.all(
            contacts.map((contact) => contactRepository.save(contact))
          );
        } else {
          console.log("Seed data already exists. Skipping insertion.");
          return Promise.resolve();
        }
      })
      .then(() => {
        console.log("Seed data inserted successfully!");
        process.exit(0);
      });
  })
  .catch((error) => {
    console.error("Error during seeding process:", error);
    process.exit(1);
  });
