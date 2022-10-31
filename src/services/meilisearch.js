import { indexTypes } from "medusa-core-utils"
import { SearchService } from "medusa-interfaces"
// import { MeiliSearch } from "meilisearch"
import { transformProduct } from "../utils/transform-product"
import fetch from "node-fetch";

class MeiliSearchService extends SearchService {
  constructor(container, options) {
    super()

    this.options_ = options
    // TODO
    // this.client_ = new MeiliSearch(options.config)
  }

  async createIndex(indexName, options) {
    return null
    // return await this.client_.createIndex(indexName, options)
  }

  getIndex(indexName) {
    return null
    //return this.client_.index(indexName)
  }

  async addDocuments(indexName, documents, type) {
    return null
    //const transformedDocuments = this.getTransformedDocuments(type, documents)
    //return await this.client_
    //  .index(indexName)
    //  .addDocuments(transformedDocuments)
  }

  async replaceDocuments(indexName, documents, type) {
    return null
    //const transformedDocuments = this.getTransformedDocuments(type, documents)
    //return await this.client_
    //  .index(indexName)
    //  .addDocuments(transformedDocuments)
  }

  async deleteDocument(indexName, document_id) {
    return null
    //return await this.client_.index(indexName).deleteDocument(document_id)
  }

  async deleteAllDocuments(indexName) {
    return null
    //return await this.client_.index(indexName).deleteAllDocuments()
  }

  async search(indexName, not_sure, options) {
    console.log(indexName)
    console.log(not_sure)
    console.log(options)
    let query = options.additionalOptions.query
    if (query == ""){
      console.log("Query is empty!")
    }
    console.log("----QUERY:----")
    console.log(query)
    let languageCode = options.additionalOptions.options.languageCode
    console.log("----Language code:----")
    console.log(languageCode)
    let topN = options.additionalOptions.options.nProductsToRetrieve
    console.log("----topN code:----")
    console.log(topN)
    const url = "http://127.0.0.1:5000/search"
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({"q": query, "languageCode": languageCode, "topN": topN}),
        headers: { // Add auth
            'Content-Type': 'application/json'
        },
      });

    console.log("Returning")
    // return await response.json()
    return JSON.stringify(await response.json())
    // return Promise.resolve(response)

    // const { paginationOptions, filter, additionalOptions } = options
    // return await this.client_
    //   .index(indexName)
    //   .search(query, { filter, ...paginationOptions, ...additionalOptions })
  }

  async updateSettings(indexName, settings) {
    return null
    //return await this.client_.index(indexName).updateSettings(settings)
  }

  getTransformedDocuments(type, documents) {
    switch (type) {
      case indexTypes.products:
        return this.transformProducts(documents)
      default:
        return documents
    }
  }

  transformProducts(products) {
    if (!products) {
      return []
    }
    return products.map(transformProduct)
  }
}

export default MeiliSearchService
