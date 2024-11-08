import type { GetResourcesRequest, ExportTriggerRequest, XPKitAcknowledgements, XPKitResource, XPKitResources } from '../types';
import { BaseResource } from './base';

export class Exports extends BaseResource {

  /**
   * List exports
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listExports(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://exports.${this.baseUrl}/api/task`;
    this.logger.log(`Calling listExports at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read export
   * @param {string} resourceId - The ID of the export to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readExport(resourceId: string): Promise<XPKitResource> {
    const url = `https://exports.${this.baseUrl}/api/export/${resourceId}`;
    this.logger.log(`Calling readExport at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Trigger export
   * @param {ExportTriggerRequest} resource - The options used to generate the export.
   * @returns {Promise<XPKitAcknowledgements>} - The created XPKit export(s).
   *
   * @public
   */
  async triggerExport(resource: ExportTriggerRequest): Promise<XPKitAcknowledgements> {
    const url = `https://exports.${this.baseUrl}/api/export`;
    this.logger.log(`Calling triggerAlert at ${url}`);
    return await this.api.callAsyncRequests(url, 'POST', resource);
  }

  /**
   * Download export
   * @param {string} resourceId - The ID of the export to download
   * @returns {Promise<string>} - The export data (CSV string)
   *
   * @public
   */
  async downloadExport(resourceId: string): Promise<string> {
    const url = `https://exports.${this.baseUrl}/api/download/${resourceId}`;
    this.logger.log(`Calling downloadExport at ${url}`);
    return await this.api.downloadResource(url, 'GET', {}, {}, {'Accept': 'text/csv'}, 'text/csv') as string;
  }

}