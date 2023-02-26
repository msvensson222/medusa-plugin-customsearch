import { indexTypes } from "medusa-core-utils"
import { SearchService } from "medusa-interfaces"
// import { MeiliSearch } from "meilisearch"
import { transformProduct } from "../utils/transform-product"
import fetch from "node-fetch";

// Have justed changed the implementation of MeiliSearchService to 
// call my custom backend API
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
    let endpointURL = options.additionalOptions.options.endpointURL
    let apiKey = options.additionalOptions.options.apiKey
    let languageCode = options.additionalOptions.options.languageCode
    let topN = options.additionalOptions.options.nProductsToRetrieve

    let response = await fetch(endpointURL, {
        method: 'POST',
        body: JSON.stringify({"q": query, "languageCode": languageCode, "topN": topN}),
        headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey
        },
      });
    return JSON.stringify(await response.json())
  }

  async updateSettings(indexName, settings) {
    return null
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
