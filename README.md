# Villadel 🛒🛍️

_¿De qué trata Villadel?_ 

Villadel es una aplicación web de compra y venta de productos de segunda mano donde el usuario podrá
(entre otras funciones) ver productos, añadirlos a favoritos, seguir a otros usuarios, etc.

## Contenido 📖

_¿Qué tecnologías se han utilizado?_

📺 Frontend &nbsp;
  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  
💻 Backend &nbsp;
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
  ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
  ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

  
  
🛢 Bases de datos &nbsp;
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  
🎨 Diseño &nbsp;
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) 
  
⚙ IDE &nbsp;
  ![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
 
 <br/>
 
_¿Como está estructurado?_

La web se compone de los siguientes módulos:

1️⃣ __Home__ :

  El módulo principal donde se muestran los siguientes apartados:
  * Carrusel de búsqueda de productos por categorías.
  * Buscador de productos por nombre.
  * Listado de prodcutos con scroll infinito.
  
2️⃣ __Shop__ :

  El módulo donde se puede visualizar el listado de productos disponibles. Incluye lo siguiente:
  * Listado de los productos disponibles.
  * Selector de filtros por categoria, precio
  * Filtros enlazados con buscador, para poder filtrar y buscar por nombre
  * Se ha implementado ordenación de los productos, por precio, visitas, likes y fecha
  * Se ha implementado btoa para poder compartir busquedas

3️⃣ __Search__ :

  El módulo que sirve para buscar productos desde cualquier parte de la aplicación web. Incluye lo siguiente:
  * Se indica el nombre que se desea buscar

4️⃣ __Login__ :

  El módulo que sirve para poder identificarte con un usuario. Incluye lo siguiente:
  * Opción de iniciar sesión con un nombre de usuario o email y una contraseña.
  * Opción de registrarse con un nombre de usuario, un correo electrónico y una contraseña. El nombre y el correo no se pueden repetir, y todos los campos deben de cumplir unos requisitos, como la longitud o algunos carácteres especiales. Requiere una verificación que se envía al correo electrónico para poder iniciar sesión.
  * Una vez se ha iniciado sesión, se muestra el nombre del usuario con su avatar, el panel de admin de usuario y la opción de cerrar sesión.
  * Existen algunas funciones como dar Me gusta o seguir a otro usuario, las cuales requieren un inicio de sesión.

5️⃣ __Details__:
  El módulo details muestra la información del producto. Incluye lo siguiente:
  * Detalles de producto.
  * Numero de Likes.
  * Usuario que ha publicado el producto.
  * Se puede realizar like y follow.
  * Se ha implementado el componente comentarios, el cual nos permite añadir comentarios al producto y borrarlos siempre y cuando seamos el usuario que lo ha publicado.

6️⃣ __Panel de admin(Usuario)__:
  El módulo admin usuario ofrece una gestión para los productos y usuarios que sigue. Inlcuye lo siguiente:
  * Lista de productos publicados
  * Edición de datos de los productos publicados
  * Eliminación de productos publicados
  * Creación de nuevos productos
  * Redirección al details de producto
  * Listado de usuarios seguidos
  * Eliminación de seguimiento al usuario
  * Redirección al details del usuario

7️⃣ __Profile__:
  El módulo profile user funciona de manera dinámica. Incluye lo siguiente:
  * Modificación de datos si el usuario logeado es el mismo.
  * Componente de follow para seguir al usuario si no somos el mismo.
  * Estadísticas básicas del usuario.
  * Listado de productos publicados.
  * Listado de usuarios seguidos.

