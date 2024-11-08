import type { GetQueryableResourcesRequest, XPKitResources, XPKitResource, XPKitRequest, ResourceRequest, XPKitSummaryResponse } from '../types';
import { BaseResource } from './base';


export class Resources extends BaseResource {

  /**
   * List resources
   * @param {string} resourceType - The type of resource to list.
   * @param {GetQueryableResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listResources(resourceType: string, filterOptions: GetQueryableResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}`;
    this.logger.log(`Calling listResources at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read resource
   * @param {string} resourceId - The ID of the resource to fetch.
   * @param {string} resourceType - The type of resource to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readResource(resourceId: string, resourceType: string): Promise<XPKitResource> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}/${resourceId}`;
    this.logger.log(`Calling readResource at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create resource
   * @param {string} resourceType - The type of resource to create.
   * @param {ResourceRequest} resource - The resource to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createResource(resourceType: string, resource: ResourceRequest): Promise<XPKitResource> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}`;
    this.logger.log(`Calling createResource at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace resource
   * @param {string} resourceId - The ID of the resource to replace
   * @param {string} resourceType - The type of resource to replace
   * @param {ResourceRequest} resource - The resource to save
   * @returns {XPKitResource} - The updated XPKit resource
   *
   * @public
   */
  async replaceResource(resourceId: string, resourceType: string, resource: ResourceRequest): Promise<XPKitResource> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}/${resourceId}`;
    this.logger.log(`Calling replaceResource at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update resource
   * @param {string} resourceId - The ID of the resource to update.
   * @param {string} resourceType - The type of resource to update.
   * @param {XPKitRequest} resource - The resource to update.
   *
   * @public
   */
  async updateResource(resourceId: string, resourceType: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}/${resourceId}`;
    this.logger.log(`Calling updateResource at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete resource
   * @param {string} resourceId - The ID of the resource to delete.
   * @param {string} resourceType - The type of resource to delete.
   * @returns {Promise<boolean>} - True if the resource was deleted.
   *
   * @public
   */
  async deleteResource(resourceId: string, resourceType: string): Promise<boolean> {
    const url = `https://resources.${this.baseUrl}/api/${resourceType}/${resourceId}`;
    this.logger.log(`Calling deleteResource at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * The counts of each resource type
   * @returns {Promise<XPKitSummaryResponse>} - Summary of resources.
   *
   * @example Response: {"experience": 2, "object": 6}
   *
   * @public
   */
  async readResourceSummary(): Promise<XPKitSummaryResponse> {
    const url = `https://resources.${this.baseUrl}/api/resources/summary`;
    this.logger.log(`Calling readResourceSummary at ${url}`);
    return await this.api.callSummary(url, 'GET');
  }

}