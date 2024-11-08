import type { GetQueryableResourcesRequest, ActivitiesBulkRequest, XPKitResources, XPKitResource, XPKitAcknowledgement, XPKitRequest, ActivityRequest } from '../types';
import { BaseResource } from './base';

export class Activities extends BaseResource {

  /**
   * List activities
   * @param {GetQueryableResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listActivities(filterOptions: GetQueryableResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://activities.${this.baseUrl}/api/activity`;
    this.logger.log(`Calling listActivities at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read activity
   * @param {string} resourceId - The ID of the activity to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readActivity(resourceId: string): Promise<XPKitResource> {
    const url = `https://activities.${this.baseUrl}/api/activity/${resourceId}`;
    this.logger.log(`Calling readActivity at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create activity
   * @param {ActivityRequest} resource - The activity to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createActivity(resource: ActivityRequest): Promise<XPKitResource> {
    const url = `https://activities.${this.baseUrl}/api/activity`;
    this.logger.log(`Calling createActivity at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace activity
   * @param {string} resourceId - the ID of the activity to replace
   * @param {ActivityRequest} resource - the activity to save
   * @returns {XPKitResource} - the updated XPKit resource
   *
   * @public
   */
  async replaceActivity(resourceId: string, resource: ActivityRequest): Promise<XPKitResource> {
    const url = `https://activities.${this.baseUrl}/api/activity/${resourceId}`;
    this.logger.log(`Calling replaceActivity at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update activity
   * @param {string} resourceId - The ID of the activity to update.
   * @param {XPKitRequest} resource - The activity to update.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async updateActivity(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://activities.${this.baseUrl}/api/activity/${resourceId}`;
    this.logger.log(`Calling updateActivity at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete activity
   * @param {string} resourceId - The ID of the activity to delete.
   * @returns {Promise<boolean>} - True if the activity was deleted.
   *
   * @public
   */
  async deleteActivity(resourceId: string): Promise<boolean> {
    const url = `https://activities.${this.baseUrl}/api/activity/${resourceId}`;
    this.logger.log(`Calling deleteActivity at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Create bulk activities
   * @param {ActivitiesBulkRequest} resource - The activities to create.
   * @returns {Promise<XPKitAcknowledgement>} - An XPKit acknowledgement.
   *
   * @public
   */
  async createBulkActivities(resource: ActivitiesBulkRequest): Promise<XPKitAcknowledgement> {
    const url = `https://activities.${this.baseUrl}/api/activities`;
    this.logger.log(`Calling createBulkActivities at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}