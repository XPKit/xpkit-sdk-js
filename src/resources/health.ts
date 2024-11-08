import type { GetResourcesRequest, XPKitResource, XPKitResources, HealthServiceRequest, HealthApplicationRequest } from '../types';
import { BaseResource } from './base';

export class Health extends BaseResource {

  /**
   * List service configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listServiceConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://health.${this.baseUrl}/api/service`;
    this.logger.log(`Calling listServiceConfigurations at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Create service configuration
   * @param {HealthServiceRequest} resource - The service configuration to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createServiceConfiguration(resource: HealthServiceRequest): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/service`;
    this.logger.log(`Calling createServiceConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Read service configuration
   * @param {string} resourceId - The ID of the service configuration to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readServiceConfiguration(resourceId: string): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/service/${resourceId}`;
    this.logger.log(`Calling readServiceConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Replace service configuration
   * @param {string} resourceId - The ID of the service configuration to replace.
   * @param {HealthServiceRequest} resource - The service configuration to save.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async replaceServiceConfiguration(resourceId: string, resource: HealthServiceRequest): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/service/${resourceId}`;
    this.logger.log(`Calling replaceServiceConfiguration at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete service configuration
   * @param {string} resourceId - The ID of the service configuration to delete.
   * @returns {Promise<boolean>} - True if the service configuration was deleted.
   *
   * @public
   */
  async deleteServiceConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://health.${this.baseUrl}/api/service/${resourceId}`;
    this.logger.log(`Calling deleteServiceConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * List application configurations
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listApplicationConfigurations(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://health.${this.baseUrl}/api/application`;
    this.logger.log(`Calling listApplicationConfigurations at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Create application configuration
   * @param {HealthApplicationRequest} resource - The application configuration to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createApplicationConfiguration(resource: HealthApplicationRequest): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/application`;
    this.logger.log(`Calling createApplicationConfiguration at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Read application configuration
   * @param {string} resourceId - The ID of the application configuration to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readApplicationConfiguration(resourceId: string): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/application/${resourceId}`;
    this.logger.log(`Calling readApplicationConfiguration at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Replace application configuration
   * @param {string} resourceId - The ID of the application configuration to replace.
   * @param {HealthApplicationRequest} resource - The application configuration to save.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async replaceApplicationConfiguration(resourceId: string, resource: HealthApplicationRequest): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/application/${resourceId}`;
    this.logger.log(`Calling replaceApplicationConfiguration at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete application configuration
   * @param {string} resourceId - The ID of the application configuration to delete.
   * @returns {Promise<boolean>} - True if the application configuration was deleted.
   *
   * @public
   */
  async deleteApplicationConfiguration(resourceId: string): Promise<boolean> {
    const url = `https://health.${this.baseUrl}/api/application/${resourceId}`;
    this.logger.log(`Calling deleteApplicationConfiguration at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Application check in
   * @param {string} accountId - The ID of the account the application belongs to.
   * @param {string} token - The token of the application that needs to check in.
   * @returns {Promise<XPKitResource>} - The XPKit resource confirming the check in.
   *
   * @public
   */
  async checkinApplication(accountId: string, token: string): Promise<XPKitResource> {
    const url = `https://health.${this.baseUrl}/api/application/${accountId}/${token}`;
    this.logger.log(`Calling checkinApplication at ${url}`);
    return await this.api.callResource(url, 'GET');
  }
}