import React from 'react';


const Home = () => {
  return (
    <div className="container">
      <h1>Funcionalidad del proyecto</h1>
      <span><strong>Json-server</strong></span>
      <p>
        Para poder editar los datos de entrada use un mock diferente pero que igual realiza peticiones.<br/>
        Hay que instalar <strong>JSON-server</strong>, se puede descargar desde el siguiente <a href="https://www.npmjs.com/package/json-server">Link</a>.<br/>
        Es nesecario correr el comando desde la raiz de este proyecto con en el puerto 5000 con el siguiente comando: <i> "json-server --watch db.json --port 5000"</i>
      </p>
      <span><strong>Gráfica del Índice de precios y cotizaciones</strong></span>
      <p>
        Para visualizar la gráfica del IPC se puede ver con cualquier usuario o incluso sin iniciar sesión
      </p>
      <span><strong>Tabla y detalles del IPC</strong></span>
      <p>
        Para visualizar los detalles de la tabla del IPC es necesario ingresar con el user_admin@email.com para tener un rol de administrador.<br/>
        La tabla se puede descargar a un archivo csv <br/>
        Para editar una entrada del IPC hay que hacer click en la fila.
      </p>
      <p>By Rex Vargas G.</p>
    </div>
  )
}

export default Home;