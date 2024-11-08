import type { GetResourcesRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, XPKitRequest, SouvenirRequest, SouvenirsDuplicateRequest } from '../types';
import { BaseResource } from './base';


export class Souvenirs extends BaseResource {

  /**
   * List souvenirs
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listSouvenirs(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir`;
    this.logger.log(`Calling listSouvenirs at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read souvenir
   * @param {string} resourceId - The ID of the souvenir to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readSouvenir(resourceId: string): Promise<XPKitResource> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir/${resourceId}`;
    this.logger.log(`Calling readSouvenir at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create souvenir
   * @param {SouvenirRequest} resource - The souvenir to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createSouvenir(resource: SouvenirRequest): Promise<XPKitResource> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir`;
    this.logger.log(`Calling createSouvenir at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace souvenir
   * @param {string} resourceId - The ID of the souvenir to replace
   * @param {SouvenirRequest} resource - The souvenir to save
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async replaceSouvenir(resourceId: string, resource: SouvenirRequest): Promise<XPKitResource> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir/${resourceId}`;
    this.logger.log(`Calling replaceSouvenir at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update souvenir
   * @param {string} resourceId - The ID of the souvenir to update
   * @param {XPKitRequest} resource - The souvenir to update
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async updateSouvenir(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir/${resourceId}`;
    this.logger.log(`Calling updateSouvenir at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete souvenir
   * @param {string} resourceId - The ID of the souvenir to delete
   * @returns {boolean} - True if the souvenir was deleted successfully
   *
   * @public
   */
  async deleteSouvenir(resourceId: string): Promise<boolean> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenir/${resourceId}`;
    this.logger.log(`Calling deleteSouvenir at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Duplicate souvenirs
   * @param {SouvenirsDuplicateRequest} resource - The souvenirs to duplicate.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of the duplicate request.
   *
   * @public
   */
  async duplicateSouvenirs(resource: SouvenirsDuplicateRequest): Promise<XPKitAcknowledgement> {
    const url = `https://souvenirs.${this.baseUrl}/api/souvenirs/duplicate`;
    this.logger.log(`Calling duplicateSouvenirs at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}