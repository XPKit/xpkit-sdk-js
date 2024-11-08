import type { GetResourcesRequest, XPKitResources, XPKitResource, SocialAuthRequest } from '../types';
import { BaseResource } from './base';


export class SocialAuth extends BaseResource {

  /**
   * List configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://socialauth.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling listConfigurations at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read configuration
   * @param {string} resourceId - The ID of the configuration to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readConfiguration(resourceId: string): Promise<XPKitResource> {
    const url = `https://socialauth.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling readConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create configuration
   * @param {SocialAuthRequest} resource - The configuration to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createConfiguration(resource: SocialAuthRequest): Promise<XPKitResource> {
    const url = `https://socialauth.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling createConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace configuration
   * @param {string} resourceId - The ID of the configuration to replace.
   * @param {SocialAuthRequest} resource - The new configuration data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceConfiguration(resourceId: string, resource: SocialAuthRequest): Promise<XPKitResource> {
    const url = `https://socialauth.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling replaceConfiguration at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete configuration
   * @param {string} resourceId - The ID of the configuration to delete.
   * @returns {Promise<boolean>} - True if the configuration was deleted.
   *
   * @public
   */
  async deleteConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://socialauth.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling deleteConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

}