import type { GetResourcesRequest, XPKitAcknowledgement, XPKitResource, XPKitResources, XPKitRequest, NotificationCampaignRequest, NotificationTriggerRequest } from '../types';
import { BaseResource } from './base';


export class Notifications extends BaseResource {

  /**
   * List templates
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listTemplates(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://notifications.${this.baseUrl}/api/template`;
    this.logger.log(`Calling listTemplates at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Upload template
   * @param {File} template - The template file to upload.
   * @returns {Promise<XPKitResource>} - The uploaded template.
   *
   * @public
   */
  async uploadTemplate(template: File): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/template`;
    this.logger.log(`Calling uploadTemplate at ${url}`);
    return await this.api.uploadMultipart(url, {'template': template}) as XPKitResource;
  }

  /**
   * List campaigns
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listCampaigns(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://notifications.${this.baseUrl}/api/campaign`;
    this.logger.log(`Calling listCampaigns at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read campaign
   * @param {string} resourceId - The ID of the campaign to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readCampaign(resourceId: string): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/${resourceId}`;
    this.logger.log(`Calling readCampaign at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create campaign
   * @param {NotificationCampaignRequest} resource - The campaign to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createCampaign(resource: NotificationCampaignRequest): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/campaign`;
    this.logger.log(`Calling createActivity at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace campaign
   * @param {string} resourceId - The ID of the campaign to replace.
   * @param {NotificationCampaignRequest} resource - The new campaign data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceCampaign(resourceId: string, resource: NotificationCampaignRequest): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/${resourceId}`;
    this.logger.log(`Calling replaceCampaign at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update campaign
   * @param {string} resourceId - The ID of the campaign to update.
   * @param {XPKitRequest} resource - The campaign to update.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async updateCampaign(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/camapign/${resourceId}`;
    this.logger.log(`Calling updateCampaign at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete campaign
   * @param {string} resourceId - The ID of the campaign to delete.
   * @returns {Promise<boolean>} - True if the campaign was deleted.
   *
   * @public
   */
  async deleteCampaign(resourceId: string): Promise<boolean> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/${resourceId}`;
    this.logger.log(`Calling deleteCampaign at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * List scheduled campaigns
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listScheduledCampaigns(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/schedule`;
    this.logger.log(`Calling listScheduledCampaigns at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read scheduled campaign
   * @param {string} resourceId - The ID of the scheduled campaign to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readScheduledCampaign(resourceId: string): Promise<XPKitResource> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/schedule/${resourceId}`;
    this.logger.log(`Calling readScheduledCampaign at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Cancel scheduled campaign
   * @param {string} resourceId - The ID of the scheduled campaign to cancel.
   * @returns {Promise<boolean>} - True if the scheduled campaign was cancelled.
   *
   * @public
   */
  async cancelScheduledCampaign(resourceId: string): Promise<boolean> {
    const url = `https://notifications.${this.baseUrl}/api/campaign/schedule/${resourceId}`;
    this.logger.log(`Calling cancelScheduledCampaign at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Trigger a notification
   * @param {NotificationTriggerRequest} resource - The required options needed to send the notification.
   * @returns {Promise<XPKitAcknowledgement>} - Acknowledgement of trigger request.
   *
   * @public
   */
  async triggerNotificaton(resource: NotificationTriggerRequest): Promise<XPKitAcknowledgement> {
    const url = `https://notifications.${this.baseUrl}/api/notification`;
    this.logger.log(`Calling triggerNotificaton at ${url}`);
    return await this.api.callAsyncRequest(url, 'POST', resource);
  }

}