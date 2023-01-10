const fs = require ('fs')
const { v4: uuidv4 } = require('uuid')


class Contanier {
  constructor( file ) {
      this.file = file
  }

  
  async getAll() {
    try{
      const products = await fs.promises.readFile( this.file, 'utf-8')
      return JSON.parse( products )
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 
  
  async saveFile ( products ) {
    try {
      await fs.promises.writeFile(
        this.file, JSON.stringify( products, null, 2 )
        )
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async save( product ) { 
    const products = await this.getAll()
    try{
        const idNew =  uuidv4()
        const productNew = { id: idNew, timestamp:new Date().toLocaleString(), ...product }       
        products.push(productNew)        
        await this.saveFile( products )
        return idNew

    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  
  async addCart( cartId ) { 
    const carts = await this.getAll()
    try{
        const newCart = { timestamp:new Date().toLocaleString(), id: cartId }       
        carts.push(newCart)        
        await this.saveFile( carts )
        return
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async getById( id ) {
    const products = await this.getAll()
    try {
      const product = products.find( ele => ele.id === id)
      return product ? product : null
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

  async getByCode( code ) {
    const products = await this.getAll()
    try {
      const product = products.find( ele => ele.code === code)
      return product ? product : null
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteById( id ) {
    let products = await this.getAll()  
    try {
      products = products.filter( ele => ele.id != id )
      await this.saveFile( products )
    
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async deleteAll() {
    await this.saveFile(this.file, [])
  }

}

const products = new Contanier('./data/products.txt')
const carts = new Contanier('./data/carts.txt')

module.exports = { products, carts }