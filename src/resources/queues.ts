import type { GetResourcesRequest, XPKitResources, XPKitResource, XPKitRequest, QueueRequest, QueueItemRequest, XPKitSummaryResponse } from '../types';
import { BaseResource } from './base';


export class Queues extends BaseResource {

  /**
   * List queues
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   * @returns {Promise<XPKitResources>} - XPKit resources matching the filter options.
   *
   * @public
   */
  async listQueues(filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://queues.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling listQueues at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read queue
   * @param {string} resourceId - The ID of the queue to fetch.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readQueue(resourceId: string): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling readQueue at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create queue
   * @param {QueueRequest} resource - The queue to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createQueue(resource: QueueRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/configuration`;
    this.logger.log(`Calling createQueue at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace queue
   * @param {string} resourceId - The ID of the queue to replace.
   * @param {QueueRequest} resource - The new queue data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceQueue(resourceId: string, resource: QueueRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling replaceQueue at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update queue
   * @param {string} resourceId - The ID of the queue to update.
   * @param {XPKitRequest} resource - The new queue data.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async updateQueue(resourceId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling updateQueue at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete queue
   * @param {string} resourceId - The ID of the queue to delete.
   * @returns {Promise<boolean>} - True if the queue was deleted successfully.
   *
   * @public
   */
  async deleteQueue(resourceId: string): Promise<boolean> {
    const url = `https://queues.${this.baseUrl}/api/configuration/${resourceId}`;
    this.logger.log(`Calling deleteQueue at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * List queue items
   * @param {string} queueId - The ID of the queue to list items from.
   * @param {GetResourcesRequest} filterOptions - Filter options to apply.
   *
   * @public
   */
  async listQueueItems(queueId: string, filterOptions: GetResourcesRequest = {}): Promise<XPKitResources> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}`;
    this.logger.log(`Calling listQueueItems at ${url}`);
    return await this.api.getResources(url, filterOptions);
  }

  /**
   * Read queue item
   * @param {string} resourceId - The ID of the queue item to fetch.
   * @param {string} queueId - The ID of the queue containing the item.
   * @returns {Promise<XPKitResource>} - XPKit resource matching the resourceId.
   *
   * @public
   */
  async readQueueItem(resourceId: string, queueId: string): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}/${resourceId}`;
    this.logger.log(`Calling readQueueItem at ${url}`);
    return await this.api.callResource(url, 'GET');
  }

  /**
   * Create queue item
   * @param {string} queueId - The ID of the queue to add the item to.
   * @param {QueueItemRequest} resource - The queue item to create.
   * @returns {Promise<XPKitResource>} - The created XPKit resource.
   *
   * @public
   */
  async createQueueItem(queueId: string, resource: QueueItemRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}`;
    this.logger.log(`Calling createQueueItem at ${url}`);
    return await this.api.callResource(url, 'POST', resource);
  }

  /**
   * Replace queue item
   * @param {string} resourceId - The ID of the queue item to replace.
   * @param {string} queueId - The ID of the queue containing the item.
   * @param {QueueItemRequest} resource - The new queue item data.
   * @returns {Promise<XPKitResource>} - The replaced XPKit resource.
   *
   * @public
   */
  async replaceQueueItem(resourceId: string, queueId: string, resource: QueueItemRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}/${resourceId}`;
    this.logger.log(`Calling replaceQueueItem at ${url}`);
    return await this.api.callResource(url, 'PUT', resource);
  }

  /**
   * Update queue item
   * @param {string} resourceId - The ID of the queue item to update.
   * @param {string} queueId - The ID of the queue containing the item.
   * @param {XPKitRequest} resource - The new queue item data.
   * @returns {Promise<XPKitResource>} - The updated XPKit resource.
   *
   * @public
   */
  async updateQueueItem(resourceId: string, queueId: string, resource: XPKitRequest): Promise<XPKitResource> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}/${resourceId}`;
    this.logger.log(`Calling updateQueueItem at ${url}`);
    return await this.api.callResource(url, 'PATCH', resource);
  }

  /**
   * Delete queue item
   * @param {string} resourceId - The ID of the queue item to delete.
   * @param {string} queueId - The ID of the queue containing the item.
   * @returns {Promise<boolean>} - True if the queue item was deleted successfully.
   *
   * @public
   */
  async deleteQueueItem(resourceId: string, queueId: string): Promise<boolean> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}/${resourceId}`;
    this.logger.log(`Calling deleteQueueItem at ${url}`);
    return await this.api.deleteResource(url);
  }

  /**
   * Read group stats for a queue
   * @param {string} queueId - The ID of the queue to list groups from.
   * @returns {Promise<XPKitSummaryResponse>} - Key-value pairs of group stats.
   *
   * @example Response: {"red": 10, "blue": 5}
   *
   * @public
   */
  async readQueueGroupStats(queueId: string): Promise<XPKitSummaryResponse> {
    const url = `https://queues.${this.baseUrl}/api/queue/${queueId}/group/stats`;
    this.logger.log(`Calling readQueueGroupStats at ${url}`);
    return await this.api.callSummary(url, 'GET');
  }

}