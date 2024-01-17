/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationAgentTypes } from './NotificationAgentTypes';
export type UserSettingsNotifications = {
    notificationTypes?: NotificationAgentTypes;
    emailEnabled?: boolean;
    pgpKey?: string | null;
    discordEnabled?: boolean;
    discordEnabledTypes?: number | null;
    discordId?: string | null;
    pushbulletAccessToken?: string | null;
    pushoverApplicationToken?: string | null;
    pushoverUserKey?: string | null;
    pushoverSound?: string | null;
    telegramEnabled?: boolean;
    telegramBotUsername?: string | null;
    telegramChatId?: string | null;
    telegramSendSilently?: boolean | null;
};

