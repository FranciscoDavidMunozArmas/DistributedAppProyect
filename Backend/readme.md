# Backend
El backend de una arquitectura monolitica, fue modificada a una arquitectura basada en microservicios.

Dentro de las presentes carpetas se encuentran construidas cada uno de los microservicios a usar.

Debido a que ya se ha implementado un _Gateway_ para facilitar el uso de los microservicios

## Requisitos
 - Para usar los microservicios debe tener instalado nodeJS

## Instalacion de paquetes
- En usando la terminal ubicarse en la carpeta del microservicio
- Usar el comando `npm install`

## Iniciar los microservicios
Actualmente, los servicios tienen que iniciarse de forma individual, cabe resaltar que deben iniciarse todos los microservicios

- Para iniciar en modo desarrollador usar `npm run dev`

- Para generar un version para produccion usar `npm run build`

- Para iniciar en modo de produccion usar `npm start`

## Rutas de los microservicios
La base de la URL es: `host:port/api/v1`

### _Comentarios_
- POST `/commentaries`
- DELETE `/commentaries`
- PUT `/commentaries/:id`
- DELETE `/commentaries/:id`
- GET `/commentaries/recipe/:recipe`
- DELETE `/commentaries/recipe/:recipe`
- GET `/commentaries/user/:user`
- DELETE `/commentaries/user/:user`

### _Recetas Completas_
- GET `/full/recipes`
- GET `/full/recipes/recipe/:id`
- GET `/full/recipes/recipe/author/:id`

### _Usuarios_
- POST `/users`
- GET `/users/:id`
- GET `/users/email/:email`
- PUT `/users/email/:email`
- DELETE `/users/email/:email`
- GET `/users/username/:username`
- PUT `/users/username/:username`
- DELETE `/users/username/:username`

### _Calificacion de las recetas_
- GET `/scores/recipes`
- GET `/scores/recipes/:recipe`
- PUT `/scores/recipes/:recipe`
- DELETE `/scores/recipes/:recipe`

### _Top de las recetas_
- GET `/top/recipes`
- GET `/top/recipes/:max`
- GET `/top/category/:category`
- GET `/top/category/category/:max`

### _Recetas_
- GET `/recipes`
- POST `/recipes`
- DELETE `/recipes`
- GET `/recipes/recipe/:id`
- PUT `/recipes/recipe/:id`
- DELETE `/recipes/recipe/:id`
- GET `/recipes/recipe/author/:id`
- DELETE `/recipes/recipe/author/:id`
- GET `/recipes/recipe/category/:category`
- DELETE `/recipes/recipe/category/:category`

### _Motor de busqueda_
- GET `/search/recipe/name/:name`
- GET `/search/recipe/author/:author`

### _Recetas Favoritas_
- GET `/favorites/:user`
- POST `/favorites/:user`
- DELETE `/favorites/:user/:recipe`

### _Calendario_
- GET `/calendar/:user`
- POST `/calendar/:user`
- DELETE `/calendar/:user`
- PUT `/calendar/:user/:calendar`
- DELETE `/calendar/:user/:calendar`
- POST `/calendar/:user/day`
- POST `/calendar/:user/interval`

## Formato de envio de datos
### _Comentarios_
```
{
    "commentary": String -> Comentario,
    "recipe": String -> ID de la receta,
    "user": String -> ID del usuario
}
```
### _Usuarios_
```
{
    "email": String -> Correo electronico,
    "username": String -> Nombre de usuario
}
```
### _Calificacion de las recetas_
```
{
    "recipe": String -> ID de la receta,
    "user": String -> ID del usuario que califica,
    "score": Number -> Calificacion de la receta
}
```
### _Recetas_
```
{
    "title": String -> Nombre de la receta,
    "image": Imagen -> Imagen de la receta,
    "category": String -> Categoria de la receta,
    "time": Number -> Tiempo de preparacion de la receta,
    "ingredients": String[] -> Ingredientes de la receta,
    "steps": String[] -> Pasos de la receta,
    "author": String -> ID del autor de la receta,
    "description": String -> Descripcion de la receta/opcional,
    "calories": Number -> Calorias de la receta/opcional,
}
```
### _Recetas Favoritas_
```
{
    "recipe": String -> ID de la receta
}
```
### _Calendario_
```
{
    "date": String -> Fecha de la receta,
    "recipe": String -> ID de la receta
}
```

# Servicio en Docker
Para correr el servicio, asegurese de que tenga instalado docker y docker-compose.

### Ejecucion
Dentro de la presente ubicacion, abre una terminal y ejecute el siguiente comando:

```docker-compose build```

Este con el fin de construir las imagenes del servicio.

```docker-compose up -d```

Este comando inicia el servicio.

Con ello, puede dirigirse a la ruta del gateway para probar el servicio.