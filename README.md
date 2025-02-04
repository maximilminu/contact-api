# Contact API

## Descripción

Esta API permite la gestión de contactos, donde se permite buscar, crear, modificar y eliminar contactos, a su vez tambien permite el envío de notificaciones a través de plantillas.

## Tecnologías Utilizadas

-Node.js
-Express
-PostgreSQL
-TypeORM
-Docker & Docker Compose

## Instalación
### Requisitos previos

-Docker
-Docker Compose
-Clonar el repositorio:

git clone https://github.com/maximilminu/contact-api.git
cd contact-api

### Levantar los contenedores:

docker-compose up --build

Se vera un log como: 
contact_seeder  | Seed data already exists. Skipping insertion.
contact_seeder  | Seed data inserted successfully!
contact_api     | Server is running on http://localhost:3000
contact_api     | Database connected successfully


El docker compose crea una base de datos PostgreSQL y corre un seed de contactos, si la base de datos ya posee informacion, no va a correr el seed.

## Uso
### Endpoints

**GET**
1- Obtener todos los contactos
GET [/contacts](http://localhost:3000/contacts)

2- GET by ID
Trae el usuario con el id buscado
GET [/contacts](http://localhost:3000/contacts/:id)

3- GET by location
Trae todos los contactos que concuerdan con la ubicacion buscada
GET [/contacts](http://localhost:3000/contacts/by-location/:location)

4- GET search Contact
Este endpoint trae todos los contactos que coinciden con el parametro de búsqueda, busca por cualquier parametro del contacto, salvo image_profile y birthdate
GET [/contacts](http://localhost:3000/contacts/search/:query)

**POST**
1- POST create contact
Espera un payload con los datos del contacto, Ej:
{
"name": "rminutillo",
"company": "Farmacia",
"email":"rminu@gmail.com",
"birthdate": "12/10/1994",
"phone":8888888888,
"address":"sgto cabral 5600",
"city":"canning",
"state":"Buenos Aires"
}
POST [/contacts](http://localhost:3000/contacts)

2- POST notifyContact
Espera un payload con los IDs de contacto, Ej:
{
    "contactIds": [5,6,7]
}
POST [/contacts](http://localhost:3000/contacts/notify-contacts)

**PUT**
1- PUT Update contact
Espera un payload con el campo del contacto a modificar, Ej:
{
    "name": "Maximilianoooo",
    "company": "La Nacion"
}
PUT [/contacts](http://localhost:3000/contacts/:id)

**DELETE**
1- DELETE by ID
Elimina el contacto que coincide con el id enviado por param
DELETE [/contacts](http://localhost:3000/contacts/:id)


## Estructura del Proyecto

contact-api/
│-- seeds/
│-- src/
│ │-- config/
│ │-- controllers/
│ │-- entities/
│ │-- routes/
│ │-- services/
│ │-- utils/
│-- Dockerfile
│-- docker-compose.yml
│-- package.json
│-- README.md
