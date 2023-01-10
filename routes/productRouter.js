const express = require('express')
const { products } = require('../api/productsClass')
const user = require('../user/user')

const { Router } = express  
const productRouter = Router() 


productRouter.get('/productos', async (req, res) => {
  const allProducts = await products.getAll()
  res.json( allProducts )
})

productRouter.get('/productos/:id', async (req, res) => {
  const id = req.params.id
  const product = await products.getById( id )
  product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})
})

productRouter.post('/productos', async (req, res) => {
  if (user.administrador){
    const productToAdd = req.body
    await products.save( productToAdd )
    res.redirect('/')
  
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos metodo POST no autorizado'})
  }
})


productRouter.put('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id
    const productToModify = req.body
    let allProducts = await products.getAll() 
    const index = allProducts.findIndex( item => item.id === id )
    if ( index !== -1 ) {
      allProducts.splice( index, 1, {...productToModify})
      products.saveFile( allProducts )
      res.send({ productToModify })
    } else {
      res.status(404).send({ error: 'id no valido'})
    }
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos/id metodo PUT no autorizado'})
  }

})


productRouter.delete('/productos/:id', async (req, res) => {
  if (user.administrador){
    const id = req.params.id
    const productToDelete = await products.getById( id )

    if (productToDelete) {
      await products.deleteById( id )
      res.send({ borrado: productToDelete})
    
    } else {
      res.status(404).send({ error: 'producto no encontrado'})
    }
  
  } else {
    res.status(403).send({error: -1, descripcion: 'ruta /productos/id metodo DELETE no autorizado'})
  }
  
})


module.exports = productRouter