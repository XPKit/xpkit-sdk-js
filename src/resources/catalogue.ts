import type { CatalogueRequest, XPKitResource } from '../types';
import { BaseResource } from './base';


export class Catalogue extends BaseResource {

  /**
   * Read catalogue
   * @param {CatalogueRequest} resource - The request options to fetch the catalogue
   * @returns {Promise<XPKitResource>} - The catalogue based on the request options
   *
   * @public
   */
  async readCatalogue(resource: CatalogueRequest): Promise<XPKitResource> {
    const url = `https://catalogue.${this.baseUrl}/api/catalogue`;
    this.logger.log(`Calling readCatalogue at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

}