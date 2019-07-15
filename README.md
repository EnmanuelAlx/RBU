# rbu

> reservacion de biblioteca de la ucab

## Build Setup

``` bash
# Clonar el proyecto
git clone https://github.com/EnmanuelAlx/RBU.git

# Luego...
cd rbu

# install dependencies
npm install

# Revisar el archivo index.js en la carpeta models para configurar los parametros de su base de datos
# Cada tabla sera representada por un archivo javascript, se encuentra como ejemplo el "task.js"
# Revisar la documentacion de sequelize o preguntar a Enmanuel si es necesario ❤

# Inicializa una BD y llamala "biblioteca"

# Modifica las Rutas y otros parametros en ormconfig.json (Ejemplo)
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "biblioteca",
  "synchronize": false,
  "entities": ["api/build/entities/*.js"],
  "subscribers": ["api/build/subscriber/*.js"],
  "migrations": ["api/build/migration/*.js"],
  "cli": {
    "entitiesDir": "api/entities",
    "migrationsDir": "api/migration",
    "subscribersDir": "api/subscriber"
  }
}

# Iniciar el proyecto en modo desarrollador
npm run dev


# Iniciar la API
npm run start:api

# Actualiza las Migraciones
./node_modules/.bin/typeorm migration:run

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
