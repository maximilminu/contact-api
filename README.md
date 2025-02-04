# Contact API

## Descripción

Esta API permite la gestión de contactos, permite búsquedar, creaciar, modificar y el envío de notificaciones a través de plantillas.

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

git clone https://github.com/tu-repo/contact-api.git
cd contact-api

Levantar los contenedores:

docker-compose up --build

La API estará corriendo en http://localhost:3000

Instalación sin Docker

Clonar el repositorio:

git clone https://github.com/tu-repo/contact-api.git
cd contact-api

Instalar dependencias:

npm install

Configurar las variables de entorno (ver sección correspondiente)

Iniciar la API:

npm start

Uso

Endpoints principales

Obtener todos los contactos

GET /contacts

Respuesta:

[
{
"id": 1,
"name": "John Doe",
"email": "john@example.com"
}
]

Notificar contactos

POST /contacts/notify

Cuerpo de la solicitud:

{
"contactIds": [1, 2, 3]
}

Respuesta:

{
"message": "Notifications sent successfully"
}

Variables de Entorno

Para configurar la API, debes definir las siguientes variables de entorno en un archivo .env:

DB_HOST=db
DB_USER=laNacionRoot
DB_PASSWORD=Pass123
DB_NAME=contact_db
DB_PORT=5432
PORT=3000

Estructura del Proyecto

contact-api/
│-- src/
│ │-- controllers/
│ │-- routes/
│ │-- services/
│ │-- utils/
│-- Dockerfile
│-- docker-compose.yml
│-- package.json
│-- README.md

Contribución

Si deseas contribuir, puedes hacer un fork del repositorio, crear una rama con tus cambios y luego abrir un pull request.
