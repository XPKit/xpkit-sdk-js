export type GetQueryableResourcesRequest = {
  x__page?: number,
  x__limit?: number,
  x__token?: string,
  x__query?: string,
  [x: string]: string | number | boolean | undefined,
};

export type GetResourcesRequest = {
  x__page?: number,
  x__limit?: number,
  x__token?: string,
  [x: string]: string | number | boolean | undefined,
};

export type XPKitRequest = {
  [index: string]: unknown,
};

export type ActivityRequest = {
  experience_id: string,
  owner_id: string,
  activity_type: string,
  payload: {
    [x: string]: unknown
  },
  [x: string]: unknown
};

export type ActivitiesBulkRequest = {
  activities: ActivityRequest[],
  webhook_url?: string
};

export type AlertDistributionRequest = {
  name: string,
  channels: {
    email?: {
      template: string,
      addresses: string[]
    },
    sentry?: {
      configs: [
        {
          sentry_dsn: string,
          name: string
        }
      ]
    },
    slack?: {
      configs: [
        {
          channel: string,
          webhook: string,
          name: string
        }
      ]
    },
    teams?: {
      configs: [
        {
          webhook: string,
          name: string
        }
      ]
    },
  }
};

export type AlertTriggerRequest = {
  distribution_list: string
  context?: {
    [x: string]: unknown
  },
  channel_context?: {
    slack?: {
      [x: string]: unknown
    },
    teams?: {
      [x: string]: unknown
    },
    email?: {
      [x: string]: unknown
    },
    sentry?: {
      [x: string]: unknown
    }
  },
};

export type CatalogueRequest = {
  experience_id: string
  profile_key_and_value: {
    email?: string,
    qr_code?: string,
    rfid?: string,
  },
  account_id: string,
};

export type ExportTriggerRequest = {
  name: string,
  export_type: string,
  schedule_type: string,
  experience_id?: string,
  activity_type?: string,
  timezone?: string,
  update_datetime?: string,
  notify?: string,
  start_date?: string,
  end_date?: string,
  profile_fields?: string[],
  activity_fields?: string[],
  schedule?: {
    frequency?: string,
    runtime?: string,
    start_date?: string,
    stop_date?: string,
  }
};

export type HealthServiceRequest = {
  service_name: string,
  endpoint: string,
  alert_distribution_list: string,
  http_method?: 'GET' | 'POST',
  successful_status_codes?: number[],
  [x: string]: unknown
};

export type HealthApplicationRequest = {
  service_name: string,
  request_frequency: number
  alert_distribution_list: string,
  disable_alerts?: boolean,
  [x: string]: unknown
};

export type IdentificationTypeOptions = 'qrcode' | 'pdf417';

export type IdentificationOptions = {
  format?: 'text' | 'png',
  data_length?: number,
  fg_color?: string,
  bg_color?: string,
  columns?: number,
  security_level?: string,
  scale?: number,
  ratio?: number,
  padding?: number,
  box_size?: number,
  border?: number,
  data?: string,
};

export type IdentificationsBatchRequest = {
  name: string,
  amount: number,
  notify?: string,
  options?: IdentificationOptions
};

export type IdentificationGenerateWalletRequest = {
  configuration_id: string,
  data: {
    unique_code: string,
    [x: string]: unknown
  }
};

export type MomentRequest = {
  name: string,
  experience_id: string,
  object_ids: string[],
  [x: string]: unknown
};

export type MomentsDuplicateRequest = {
  old_experience_id: string,
  new_experience_id: string,
};

export type NftConfigurationRequest = {
  configuration_name: string,
  blockchain: 'solana',
  blockchain_options: {
    wallet_auth: 'private_key',
    private_key: string,
    network: 'devnet' | 'mainnet-beta',
    grant_ownership_to_profile?: boolean,
  },
  description?: string,
};

export type NftMintRequest = {
  profile_id: string,
  experience_id: string,
  configuration_id: string,
  nft_name: string,
  nft_description?: string,
  nft?: File,
  nft_location?: string,
  thumbnail?: File,
  thumbnail_location?: string,
  nft_symbol?: string,
  nft_metadata?: string,
  external_url?: string,
  grant_ownership_to_profile?: boolean
};

export type NotificationCampaignRequest = {
  campaign_name: string,
  experience_id: string,
  object_id: string,
  gateway: 'mandrill' | 'sendgrid' | 'sns',
  notification_type: 'email' | 'sns',
  gateway_config: {
    [x: string]: unknown
  },
  content: {
    _default: string,
    [x: string]: {
      [x: string]: unknown
    } | string
  },
  webhook_url?: string,
  send_default_on_invalid?: boolean
};

export type NotificationTriggerRequest = {
  campaign_id: string,
  recipient_email?: string,
  recipient_phone?: string,
  recipient_id?: string,
  language?: string,
  content?: {
    [x: string]: unknown
  },
  disable_activity_creation?: boolean,
  webhook_url?: string,
  send_at?: string,
  provide_gateway_request?: boolean
};

export type ProfilesMergeRequest = {
  authority: string,
  profiles: string[]
};

export type ProfilesBulkRequest = {
  profiles: [
    {
      [x: string]: unknown
    }
  ],
  webhook_url?: string
  update?: boolean
};

export type QueueRequest = {
  name: string,
  experience_id: string,
  rules?: [
    {
      action: 'send_notification' | 'cancel_item',
      action_field: string,
      action_value: string,
      action_identifier: string,
    }
  ]
};

export type QueueItemRequest = {
  status?: 'wait' | 'call' | 'confirm' | 'ready' | 'play' | 'complete' | 'cancel',
  priority?: number,
  group?: string,
  instance?: string,
  notification_sms?: string,
  notification_email?: string,
  notification_profile?: string,
  notification_data?: {
    [x: string]: unknown
  }
};

export type ResourceRequest = {
  name: string,
  [x: string]: unknown
};

export type SocialAuthRequest = {
  name: string,
  type: 'wechat',
  experience_id: string,
  domain: string,
  app_id: string,
  app_secret: string,
  auth_file_name: string,
  auth_file_contents: string
};

export type SouvenirRequest = {
  name: string,
  url: string,
  type: 'image' | 'video' | 'document' | 'audio',
  experience_id: string,
  moment_ids: string[],
};

export type SouvenirsDuplicateRequest = {
  old_experience_id: string,
  new_experience_id: string,
};

export type UserUpdateRequest = {
  first_name?: string,
  last_name?: string,
};

export type UserInviteRequest = {
  first_name: string,
  last_name: string,
  email: string,
  redirect_uri?: string,
};

export type VccConfigurationRequest = {
  configuration_name: string,
  experience_id: string,
  adapter_name: string,
  adapter_config?: {
    auth?: {
      [x: string]: unknown
    },
    defaults?: {
      [x: string]: unknown
    },
    activity_config?: {
      experience_id: string,
      activity_type: string,
      payload: {
        [x: string]: unknown
      },
      [x: string]: unknown
    }
  },
  call_chain?: [
    string[] | number[]
  ],
  webhook_url?: string,
};

export type VccTriggerTaskRequest = {
  data: File,
  configuration_name: string,
  extras?: string
};

export type VccTriggerTaskGroupRequest = {
  configuration_names: string,
  [x: string]: File | string
};