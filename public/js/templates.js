function templateForm(){
  return `
    <div class="container">
    <div class="alert alert-primary text-center" role="alert">
      INGRESO DE NUEVO PRODUCTO
    </div>
  </div>

<form id= "formulario" class="container" action="/api/productos" method="POST" >
   <div class="mb-3">
     <label for="name" class="form-label">Nombre del producto</label>
     <input type="text" class="form-control" id="name" name="title">
   </div>
   <div class="mb-3">
    <label for="description" class="form-label">Descripcion</label>
    <input type="text" class="form-control" id="description" name="description">
  </div>

  <div class="row d-flex justify-content-center">
    <div class="mb-3 col">
      <label for="code" class="form-label">Codigo</label>
      <input type="number" class="form-control" id="code" name="code">
    </div>
    <div class="mb-3 col">
      <label for="price" class="form-label">Precio</label>
      <input type="number" class="form-control" id="price" name="price">
    </div>
    <div class="mb-3 col">
      <label for="stock" class="form-label">Stock</label>
      <input type="number" class="form-control" id="stock" name="stock">
    </div>
  </div>

   <div class="mb-3">
     <label for="picture" class="form-label">Foto del producto</label>
     <input type="text" class="form-control" id="picture" name="thumbnail" aria-describedby="pictureHelp">
     <div id="pictureHelp" class="form-text">URL de la foto</div>
   </div>
   <button type="submit" class="btn btn-primary">Guardar</button>
 </form>
  `
}


function templateProductos( productos ){
  let html = ''
  productos.forEach(( element ) => {
    html = html + `
    <div class="card col-3 mx-2 my-1" style="width: 18rem;">
      <img src="${element.thumbnail}" class="card-img-top" alt="${element.title}">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.description}</p>
        <p class="card-text">Precio: $${element.price}</p>
        <p class="card-text">Codigo: ${element.code} - Stock: ${element.stock}</p>
        <p class="card-text fs-6">${element.id}</p>
      </div>
    </div>` 
  })
  return html
}


function templateCarritos( carritos ){
  let html = ''
  carritos.forEach(( element ) => {
    html = html + `
  <div class="card col-3 mx-2 my-1 text-center">
    <div class="card-header">
      Numero ID de carrito
    </div>
    <div class="card-body">
      <h5 class="card-title">${element.id}</h5>
    </div>
    <div class="card-footer text-muted">
      Creado: ${element.timestamp}
    </div>
  </div>` 
  })
  return html
}


function templateListaProductos( productos ){
  let html = '<ul class="list-group">'
  productos.forEach(( element ) => {
    html = html + `
    <li class="list-group-item">${element.title}-${element.description} id: ${element.id}</li>`
  })
  html = html + '</ul>'
  return html
}