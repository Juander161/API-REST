API RESTful de Gestión de Productos

API para gestionar productos con autenticación de usuarios mediante JWT. Incluye operaciones CRUD, registro e inicio de sesión de usuarios, y protección de rutas privadas mediante tokens.

Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JSON Web Tokens (JWT)
- Swagger

Estructura del proyecto
api-productos/
│
├── controllers/
│ ├── product.controller.js
│ └── auth.controller.js
│
├── models/
│ ├── product.model.js
│ └── user.model.js
│
├── routes/
│ ├── product.routes.js
│ └── auth.routes.js
│
├── middleware/
│ └── auth.middleware.js
│
├── config/
│ └── db.js
│
├── .env
├── server.js
├── package.json
└── README.md

Instalación y uso local

git clone <url-del-repositorio>
cd api-productos

Instalar dependencias
npm install

Crear un archivo .env en la raíz del proyecto con el siguiente contenido:

NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/api-productos
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRE=30d
Si vas a usar MongoDB Atlas, reemplaza MONGO_URI con tu cadena de conexión:mongodb+srv://<usuario>:<contraseña>@cluster0.xxxxx.mongodb.net/api-productos?retryWrites=true&w=majority

arrancarlo
npm run dev
