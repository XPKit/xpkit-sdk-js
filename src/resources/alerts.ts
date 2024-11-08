import type { GetResourcesRequest, XPKitResources, XPKitResource, AlertTriggerRequest, XPKitAcknowledgement, AlertDistributionRequest } from '../types';
import { BaseResource } from './base';

export class Alerts extends BaseResource {

  /**
   * List distributions
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listDistributions(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://alerts.${this.baseUrl}/api/distribution`;
    this.logger.log(`Calling listDistributions at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read distribution
   * @param {string} resourceId - The ID of the distribution to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readDistribution(resourceId: string): Promise<XPKitResource> {
    const url = `https://alerts.${this.baseUrl}/api/distribution/${resourceId}`;
    this.logger.log(`Calling readDistribution at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create distribution
   * @param {AlertDistributionRequest} resource - The distribution to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createDistribution(resource: AlertDistributionRequest): Promise<XPKitResource> {
    const url = `https://alerts.${this.baseUrl}/api/distribution`;
    this.logger.log(`Calling createDistribution at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace distribution
   * @param {string} resourceId - The ID of the distribution to replace.
   * @param {AlertDistributionRequest} resource - The new distribution data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceDistribution(resourceId: string, resource: AlertDistributionRequest): Promise<XPKitResource> {
    const url = `https://alerts.${this.baseUrl}/api/distribution/${resourceId}`;
    this.logger.log(`Calling replaceDistribution at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Delete distribution
   * @param {string} resourceId - The ID of the distribution to delete.
   * @returns {Promise<boolean>} - True if the distribution was deleted.
   *
   * @public
   */
  async deleteDistribution(resourceId: string): Promise<boolean> {
    const url = `https://alerts.${this.baseUrl}/api/distribution/${resourceId}`;
    this.logger.log(`Calling deleteDistribution at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Trigger alert
   * @param {AlertTriggerRequest} resource - The alert data to trigger.
   * @returns {Promise<XPKitAcknowledgement>} - An XPKit acknowledgement.
   *
   * @public
   */
  async triggerAlert(resource: AlertTriggerRequest): Promise<XPKitAcknowledgement> {
    const url = `https://alerts.${this.baseUrl}/api/alert`;
    this.logger.log(`Calling triggerAlert at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}