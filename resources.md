### Activities

Full docs [here](https://api-specs.xpkit.net/activities.html).

```typescript
listActivities(filterOptions: GetQueryableResourcesRequest): Promise<XPKitResources>
readActivity(resourceId: string): Promise<XPKitResource>
createActivity(resource: ActivityRequest): Promise<XPKitResource>
replaceActivity(resourceId: string, resource: ActivityRequest): Promise<XPKitResource>
updateActivity(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteActivity(resourceId: string): Promise<boolean>
createBulkActivities(resource: ActivitiesBulkRequest): Promise<XPKitAcknowledgement>
```

### Alerts

Full docs [here](https://api-specs.xpkit.net/alerts.html).

```typescript
listDistributions(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readDistribution(resourceId: string): Promise<XPKitResource>
createDistribution(resource: AlertDistributionRequest): Promise<XPKitResource>
replaceDistribution(resourceId: string, resource: AlertDistributionRequest): Promise<XPKitResource>
deleteDistribution(resourceId: string): Promise<boolean>
triggerAlert(resource: AlertTriggerRequest): Promise<XPKitAcknowledgement>
```

### Catalogue

Full docs [here](https://api-specs.xpkit.net/catalogue.html).

```typescript
readCatalogue(resource: CatalogueRequest): Promise<XPKitResource>
```

### Exports

Full docs [here](https://api-specs.xpkit.net/exports.html).

```typescript
listExports(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readExport(resourceId: string): Promise<XPKitResource>
triggerExport(resource: ExportTriggerRequest): Promise<XPKitAcknowledgement>
downloadExport(resourceId: string): Promise<string> // Format: text/csv
```

### Health

Full docs [here](https://api-specs.xpkit.net/health.html)

```typescript
listServiceConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
createServiceConfiguration(resource: HealthServiceRequest): Promise<XPKitResource>
readServiceConfiguration(resourceId: string): Promise<XPKitResource>
replaceServiceConfiguration(resourceId: string, resource: HealthServiceRequest): Promise<XPKitResource>
deleteServiceConfiguration(resourceId: string): Promise<boolean>
listApplicationConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
createApplicationConfiguration(resource: HealthApplicationRequest): Promise<XPKitResource>
readApplicationConfiguration(resourceId: string): Promise<XPKitResource>
replaceApplicationConfiguration(resourceId: string, resource: HealthApplicationRequest): Promise<XPKitResource>
deleteApplicationConfiguration(resourceId: string): Promise<boolean>
checkinApplication(accountId: string, token: string): Promise<XPKitAcknowledgement>
```

### Identifications

Full docs [here](https://api-specs.xpkit.net/identifications.html)

```typescript
createIdentity(identityType: string, accountId: string, options: IdentificationFilterOptions): Promise<string | Blob>
encodeIdentity(identityType: string, accountId: string, data: string, options: IdentificationFilterOptions): Promise<Blob>
verifyIdentity(accountId: string, data: string): Promise<boolean>
listBatches(filterOptions: GetResourcesRequest): Promise<XPKitResources>
createBatch(identityType: string, resource: IdentificationsBatchRequest): Promise<XPKitResource>
downloadBatch(resourceId: string): Promise<Blob>
deleteBatch(identityType: string, resourceId: string): Promise<boolean>
listWalletConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readWalletConfiguration(resourceId: string): Promise<XPKitResource>
createWalletConfiguration(configurationName: string): Promise<XPKitResource>
uploadWalletConfigurationFile(resourceId: string, fileKey: string, file: File): Promise<XPKitResource>
updateWalletConfiguration(resourceId: string, field: string, value: string): Promise<XPKitResource>
deleteWalletConfiguration(resourceId: string): Promise<boolean>
generateWalletPassFile(resource: IdentificationGenerateWalletRequest): Promise<XPKitResource>
```

### Jobs

Full docs [here](https://api-specs.xpkit.net/jobs.html).

```typescript
listJobs(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readJob(resourceId: string): Promise<XPKitResource>
```

### Moments

Full docs [here](https://api-specs.xpkit.net/moments.html).

```typescript
listMoments(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readMoment(resourceId: string): Promise<XPKitResource>
createMoment(resource: MomentRequest): Promise<XPKitResource>
replaceMoment(resourceId: string, resource: MomentRequest): Promise<XPKitResource>
updateMoment(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteMoment(resourceId: string): Promise<boolean>
duplicateMoments(resource: MomentsDuplicateRequest): Promise<XPKitAcknowledgement>
```

### NFTs

Full docs [here](https://api-specs.xpkit.net/nfts.html).

```typescript
listConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readConfiguration(resourceId: string): Promise<XPKitResource>
createConfiguration(resource: NftConfigurationRequest): Promise<XPKitResource>
replaceConfiguration(resourceId: string, resource: NftConfigurationRequest): Promise<XPKitResource>
deleteConfiguration(resourceId: string): Promise<boolean>
mintNft(resource: NftMintRequest): Promise<XPKitAcknowledgement>
```

### Notifications

Full docs [here](https://api-specs.xpkit.net/notifications.html).

```typescript
listTemplates(filterOptions: GetResourcesRequest): Promise<XPKitResources>
uploadTemplate(template: File): Promise<XPKitResource>
listCampaigns(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readCampaign(resourceId: string): Promise<XPKitResource>
createCampaign(resource: NotificationCampaignRequest): Promise<XPKitResource>
replaceCampaign(resourceId: string, resource: NotificationCampaignRequest): Promise<XPKitResource>
updateCampaign(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteCampaign(resourceId: string): Promise<boolean>
listScheduledCampaigns(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readScheduledCampaign(resourceId: string): Promise<XPKitResource>
cancelScheduledCampaign(resourceId: string): Promise<boolean>
triggerNotificaton(resource: NotificationTriggerRequest): Promise<XPKitAcknowledgement>
```

### Profiles

Full docs [here](https://api-specs.xpkit.net/profiles.html).

```typescript
listProfiles(filterOptions: GetQueryableResourcesRequest): Promise<XPKitResources>
readProfile(resourceId: string): Promise<XPKitResource>
createProfile(resource: XPKitRequest): Promise<XPKitResource>
replaceProfile(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
updateProfile(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteProfile(resourceId: string): Promise<boolean>
createOrUpdateProfile(resource: XPKitRequest): Promise<XPKitResource>
mergeProfiles(resource: ProfilesMergeRequest): Promise<XPKitAcknowledgement>
createBulkProfiles(resource: ProfilesBulkRequest): Promise<XPKitAcknowledgement>
```

### Queues

Full docs [here](https://api-specs.xpkit.net/queues.html).

```typescript
listQueues(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readQueue(resourceId: string): Promise<XPKitResource>
createQueue(resource: QueueRequest): Promise<XPKitResource>
replaceQueue(resourceId: string, resource: QueueRequest): Promise<XPKitResource>
updateQueue(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteQueue(resourceId: string): Promise<boolean>
listQueueItems(queueId: string, filterOptions: GetResourcesRequest): Promise<XPKitResources>
readQueueItem(resourceId: string, queueId: string): Promise<XPKitResource>
createQueueItem(queueId: string, resource: QueueItemRequest): Promise<XPKitResource>
replaceQueueItem(resourceId: string, queueId: string, resource: QueueItemRequest): Promise<XPKitResource>
updateQueueItem(resourceId: string, queueId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteQueueItem(resourceId: string, queueId: string): Promise<boolean>
readQueueGroupStats(queueId: string): Promise<XPKitSummaryResponse>
```

### Resources

Full docs [here](https://api-specs.xpkit.net/resources.html).

```typescript
listResources(resourceType: string, filterOptions: GetQueryableResourcesRequest): Promise<XPKitResources>
readResource(resourceId: string, resourceType: string): Promise<XPKitResource>
createResource(resourceType: string, resource: ResourceRequest): Promise<XPKitResource>
replaceResource(resourceId: string, resourceType: string, resource: ResourceRequest): Promise<XPKitResource>
updateResource(resourceId: string, resourceType: string, resource: XPKitRequest): Promise<XPKitResource>
deleteResource(resourceId: string, resourceType: string): Promise<boolean>
readResourceSummary(): Promise<XPKitSummaryResponse>
```

### Social Auth

Full docs [here](https://api-specs.xpkit.net/socialauth.html).

```typescript
listConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readConfiguration(resourceId: string): Promise<XPKitResource>
createConfiguration(resource: SocialAuthRequest): Promise<XPKitResource>
replaceConfiguration(resourceId: string, resource: SocialAuthRequest): Promise<XPKitResource>
deleteConfiguration(resourceId: string): Promise<boolean>
```

### Souvenirs

Full docs [here](https://api-specs.xpkit.net/souvenirs.html).

```typescript
listSouvenirs(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readSouvenir(resourceId: string): Promise<XPKitResource>
createSouvenir(resource: SouvenirRequest): Promise<XPKitResource>
replaceSouvenir(resourceId: string, resource: SouvenirRequest): Promise<XPKitResource>
updateSouvenir(resourceId: string, resource: XPKitRequest): Promise<XPKitResource>
deleteSouvenir(resourceId: string): Promise<boolean>
duplicateSouvenirs(resource: SouvenirsDuplicateRequest): Promise<XPKitAcknowledgement>
```

### Users

Full docs [here](https://api-specs.xpkit.net/users.html).

```typescript
readUser(): Promise<XPKitResource>
updateUser(resource: UserUpdateRequest): Promise<XPKitResource>
inviteUserToAccount(resource: UserInviteRequest): Promise<XPKitResource>
```

### VCC

Full docs [here](https://api-specs.xpkit.net/vcc.html).

```typescript
listConfigurations(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readConfiguration(resourceId: string): Promise<XPKitResource>
createConfiguration(resource: VccConfigurationRequest): Promise<XPKitResource>
replaceConfiguration(resourceId: string, resource: VccConfigurationRequest): Promise<XPKitResource>
deleteConfiguration(resourceId: string): Promise<boolean>
uploadAsset(asset: File): Promise<boolean>
triggerTask(resource: VccTriggerTaskRequest): Promise<XPKitAcknowledgement>
triggerTaskGroup(resource: VccTriggerTaskGroupRequest): Promise<XPKitAcknowledgement>
listTasks(filterOptions: GetResourcesRequest): Promise<XPKitResources>
readTask(resourceId: string): Promise<XPKitResource>
retriggerTask(resourceId: string): Promise<XPKitResource>
retriggerTasks(resourceIds: string[]): Promise<XPKitResource>
cancelTask(resourceId: string): Promise<XPKitResource>
```
