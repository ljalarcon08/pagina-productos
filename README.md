# pagina-productos

Proyecto basado en Angular Workspace destinado a administrar una página de productos y su seguridad.

Se compone de 4 sub proyectos:

- appInicial
- appAdmin
- appProducto
- lib-auth


##Ejecutar proyecto

1. Luego de ejecutar los proyectos String boot:
    - microservicio-eureka
    - microservicio-usuario
    - microservicio-producto
    - microservicio-gateway

2. Abri consola
3. Comando > npm run start:appInicial
4. Desde navegador ingresar a http://localhost:4200


# Componentes y descripción

## AppInicial

Sub proyecto que contiene los componentes iniciales del proyecto, usa lazy load para cargar los demas subproyectos; ademas el manejo de sesión.

### Ejecución del sub proyecto

1. Luego de ejecutar los proyectos String boot:
    - microservicio-eureka
    - microservicio-usuario
    - microservicio-producto
    - microservicio-gateway

2. Abri consola
3. Comando > npm run start:appInicial
4. Desde navegador ingresar a http://localhost:4200

## AppAdmin

Contiene la Creación, actualización y eliminación de elementos mostrados en página producto.

Los elementos son:

    - Usuario
    - Producto
    - Catalogo
    - Rol

### Ejecución del sub proyecto

1. Luego de ejecutar los proyectos String boot:
    - microservicio-eureka
    - microservicio-usuario
    - microservicio-producto
    - microservicio-gateway

2. Abri consola
3. Comando > npm run start:appAdmin
4. Desde navegador ingresar a http://localhost:4200

## AppProducto

Contiene la página de productos y manejo de carros de productos.

### Ejecución del sub proyecto

1. Luego de ejecutar los proyectos String boot:
    - microservicio-eureka
    - microservicio-usuario
    - microservicio-producto
    - microservicio-gateway

2. Abri consola
3. Comando > npm run start:appProducto
4. Desde navegador ingresar a http://localhost:4200

## lib-auth

Contiene clases y servicios usados en el resto de sub proyectos:

- Servicios CRUD
    - Usuario
    - Producto
    - Catalogo
    - Rol

# Dependencias

- Angular Material
- Bootstrap
- ng-bootstrap
- SweetAlert2
- angular jwt
- hammerjs



