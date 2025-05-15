<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Auth Api

1. Levantar la base de datos
```
docker-compose up -d
```
2. Instalar las dependencias
```
npm install
```
3. Clonar el archivo __.env.template__ y renombrarlo a __.env__
4. Llenar las variables de entorno
5. Ejecutar la aplicación en modo desarrollo
```
npm run start:dev
```

## Probar el endpoint de registro de usuario

**POST:** `http://localhost:3000/auth`
**RAW:**
```
{
  "firstName": "name",
  "lastName": "lastName",
  "paternalLastName": "paternalLastName",
  "maternalLastName": "maternalLastName",
  "email": "email@example.com",
  "password": ""
}
```

## Probas el endpoint de busqueda de usuario

**GET ALL:** `http://localhost:3000/auth`

**GET id:** `http://localhost:3000/auth/id`

## Probar el endpoint de modificar 
**PATCH:** `http://localhost:3000/auth/id`
```
{
    "firstName": "",
    "lastName": "",
    "email": "",
    "paternalLastName": "",
    "maternalLastName": ""
}
```

## Probar el endpoint de eliminar

**DELETE TOTAL:** `DELETE http://localhost:3000/auth/id`
**DELETE PARTIAL:** `PATCH http://localhost:3000/auth/soft-delete/{id}`