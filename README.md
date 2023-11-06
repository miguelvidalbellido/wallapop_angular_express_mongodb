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
  * Selector de filtros por marca, tipo de motor, categoría y color.
  * Opciones como eliminar los filtros aplicados y seleccionar cualquiera de los filtros aplicados anteriormente.
  * Selector de orden por kilómetros, precio y más visitados, tanto ascendente como descendente.
  * Selector de página.
  * Componente de mapa con las ubicaciones de los coches.
  * Opción de Me gusta. Requiere iniciar sesión con un usuario.
  * Botón para ver los detalles de cada coche. Incluye las características de este, opción de Me gusta, opción para añadir unidades al carrito, ubicación en el mapa y listado con los coches relacionados.

3️⃣ __Search__ :

  El módulo que sirve para buscar coches desde cualquier parte de la aplicación web. Incluye lo siguiente:
  * Filtro por marca.
  * Filtro por modelo, dependiendo de la marca seleccionada.
  * Filtro por ciudad, dependiendo de la marca y del modelo seleccionado.

4️⃣ __Login__ :

  El módulo que sirve para poder identificarte con un usuario. Incluye lo siguiente:
  * Opción de iniciar sesión con un nombre de usuario y una contraseña.
  * Opción de registrarse con un nombre de usuario, un correo electrónico y una contraseña. El nombre y el correo no se pueden repetir, y todos los campos deben de cumplir unos requisitos, como la longitud o algunos carácteres especiales. Requiere una verificación que se envía al correo electrónico para poder iniciar sesión.
  * Opción de iniciar sesión con cuentas de Google y GitHub.
  * Opción de recuperar la contraseña mediante correo electrónico.
  * Una vez se ha iniciado sesión, se muestra el nombre del usuario con su avatar y la opción de cerrar sesión.
  * Existen algunas funciones como dar Me gusta o añadir al carrito, las cuales requieren un inicio de sesión.

5️⃣ __Cart__ :

  El módulo que permite añadir al carrito los coches y proceder a la compra de estos. Incluye lo siguiente:
  * Desde la ventana de detalles de un coche, opción para añadir al carrito la cantidad seleccionada. Se requiere inicio de sesión y se tiene en cuenta el stock del coche a la hora de sumar unidades.
  * Una vez añadido al carrito un artículo, se puede acceder a la ventana para visualizar su contenido.
  * Dentro del carrito, se pueden ver los coches añadidos con su imagen (si se hace click en la imagen, se redirige a los detalles del coche), su nombre, su cantidad (se puede actualizar la cantidad desde el propio carrito, con comprobación de stock), su precio y un botón de eliminar del carrito.
  * Precio total del carrito. Si se cambia la cantidad de un coche, se actualiza automáticamente el precio total.
  * Opción de realizar compra. Se actualiza el stock de los coches en la base de datos y se elimina el carrito. 
