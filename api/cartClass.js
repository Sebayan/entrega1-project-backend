const fs = require ('fs')


class Cart {
  constructor( file ) {
      this.file = file
  }


  async getAll() { 
    try{
      const cart = await fs.promises.readFile( this.file, 'utf-8')
      const jsonCart = JSON.parse(cart)
      return jsonCart.products 
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }
 
  
  async saveFile ( cart ) {
    try {
      await fs.promises.writeFile(
        this.file, JSON.stringify( cart, null, 2 )
        )
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }


  async add( idProduct ) { 
    const products = await this.getAll()
    try{   
        products.push( idProduct )        
        await this.saveFile( products )
        return 

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
}

module.exports = Cart