import type { GetResourcesRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, XPKitRequest, MomentRequest, MomentsDuplicateRequest } from '../types';
import { BaseResource } from './base';


export class Moments extends BaseResource {

  /**
   * List moments
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listMoments(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://moments.${this.baseUrl}/api/moment`;
    this.logger.log(`Calling listMoments at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read moment
   * @param {string} resourceId - The ID of the moment to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readMoment(resourceId: string): Promise<XPKitResource> {
    const url = `https://moments.${this.baseUrl}/api/moment/${resourceId}`;
    this.logger.log(`Calling readMoment at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create moment
   * @param {MomentRequest} resource - The moment to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createMoment(resource: MomentRequest): Promise<XPKitResource> {
    const url = `https://moments.${this.baseUrl}/api/moment`;
    this.logger.log(`Calling createMoment at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace moment
   * @param {string} resourceId - The ID of the moment to replace
   * @param {MomentRequest} resource - The moment to save
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async replaceMoment(resourceId: string, resource: MomentRequest): Promise<XPKitResource> {
    const url = `https://moments.${this.baseUrl}/api/moment/${resourceId}`;
    this.logger.log(`Calling replaceMoment at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update moment
   * @param {string} resourceId - The ID of the moment to update
   * @param {XPKitRequest} resource - The moment to update
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async updateMoment(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://moments.${this.baseUrl}/api/moment/${resourceId}`;
    this.logger.log(`Calling updateMoment at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete moment
   * @param {string} resourceId - The ID of the moment to delete
   * @returns {boolean} - True if the moment was deleted
   *
   * @public
   */
  async deleteMoment(resourceId: string): Promise<boolean> {
    const url = `https://moments.${this.baseUrl}/api/moment/${resourceId}`;
    this.logger.log(`Calling deleteMoment at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Duplicate moments
   * @param {MomentsDuplicateRequest} resource - The moments to duplicate.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of the duplication request.
   *
   * @public
   */
  async duplicateMoments(resource: MomentsDuplicateRequest): Promise<XPKitAcknowledgement> {
    const url = `https://moments.${this.baseUrl}/api/moments/duplicate`;
    this.logger.log(`Calling duplicateMoments at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}