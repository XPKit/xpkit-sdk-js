import type { GetResourcesRequest, XPKitResource, XPKitResources } from '../types';
import { BaseResource } from './base';


export class Jobs extends BaseResource {

  /**
   * List jobs
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listJobs(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://jobs.${this.baseUrl}/api/job`;
    this.logger.log(`Calling listJobs at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read job
   * @param {string} resourceId - The ID of the job to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readJob(resourceId: string): Promise<XPKitResource> {
    const url = `https://jobs.${this.baseUrl}/api/job/${resourceId}`;
    this.logger.log(`Calling readJob at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

}