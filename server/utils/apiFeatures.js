class ApiFeatures {

  constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
  }
  search() {
      const prodName = this.queryStr.prodName ? {name: {$regex: this.queryStr.prodName, $options: 'i'}} : {}
    
      //this.query <=> Apifeatures.query
      this.query = this.query.find({ ...prodName }) 
      return this;
  }

  filter() {

      
       
      const queryCopy = { ...this.queryStr } 

      const removeFields = ['prodName', 'limit', 'page']
      removeFields.forEach(el => delete queryCopy[el]);

      
      let queryStr = JSON.stringify(queryCopy)
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


      this.query = this.query.find(JSON.parse(queryStr)) 
      return this
  }

  pagination(prodPerPage) {
      const activePage = Number(this.queryStr.page) || 1  
      const skip = prodPerPage * (activePage - 1); 

      this.query = this.query.limit(prodPerPage).skip(skip) 
      return this;
  }

}

module.exports = ApiFeatures