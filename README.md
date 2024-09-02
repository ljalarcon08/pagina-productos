# pagina-productos

Proyecto basado en Angular Workspace destinado a administrar una página de productos y su seguridad.

Se compone de 4 sub proyectos:

- appInicial
- appAdmin
- appProducto
- lib-auth


##Ejecutar proyecto

1. Luego de ejecutar los proyectos String boot:
    -microservicio-eureka
    -microservicio-usuario
    -microservicio-producto
    -microservicio-gateway

2. Abri consola
3. Comando > npm run start:appInicial
4. Desde navegador ingresar a http://localhost:4200

##AppInicial

Sub proyecto que contiene los componentes iniciales del proyecto, usa lazy load para cargar los demas subproyectos.

##AppAdmin

Contiene la Creacion, actualización y elminiacion de elementos mostrados en página producto.

##AppProducto

Contiene la página de productos y manejo de carros de productos.

##lib-auth

Contiene clases y servicios usados en el resto de sub proyectos

##Dependencias:

-Angular Material
-Bootstrap
-ng-bootstrap
-SweetAlert2
-angular jwt
-hammerjs



