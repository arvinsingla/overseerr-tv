/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DiscordSettings } from '../models/DiscordSettings';
import type { DiscoverSlider } from '../models/DiscoverSlider';
import type { GotifySettings } from '../models/GotifySettings';
import type { Job } from '../models/Job';
import type { LunaSeaSettings } from '../models/LunaSeaSettings';
import type { MainSettings } from '../models/MainSettings';
import type { NotificationEmailSettings } from '../models/NotificationEmailSettings';
import type { PlexDevice } from '../models/PlexDevice';
import type { PlexLibrary } from '../models/PlexLibrary';
import type { PlexSettings } from '../models/PlexSettings';
import type { PublicSettings } from '../models/PublicSettings';
import type { PushbulletSettings } from '../models/PushbulletSettings';
import type { PushoverSettings } from '../models/PushoverSettings';
import type { RadarrSettings } from '../models/RadarrSettings';
import type { ServiceProfile } from '../models/ServiceProfile';
import type { SlackSettings } from '../models/SlackSettings';
import type { SonarrSettings } from '../models/SonarrSettings';
import type { TautulliSettings } from '../models/TautulliSettings';
import type { TelegramSettings } from '../models/TelegramSettings';
import type { WebhookSettings } from '../models/WebhookSettings';
import type { WebPushSettings } from '../models/WebPushSettings';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SettingsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get main settings
     * Retrieves all main settings in a JSON object.
     * @returns MainSettings OK
     * @throws ApiError
     */
    public getSettingsMain(): CancelablePromise<MainSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/main',
        });
    }
    /**
     * Update main settings
     * Updates main settings with the provided values.
     * @param requestBody
     * @returns MainSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsMain(
        requestBody: MainSettings,
    ): CancelablePromise<MainSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/main',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get main settings with newly-generated API key
     * Returns main settings in a JSON object, using the new API key.
     * @returns MainSettings OK
     * @throws ApiError
     */
    public postSettingsMainRegenerate(): CancelablePromise<MainSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/main/regenerate',
        });
    }
    /**
     * Get Plex settings
     * Retrieves current Plex settings.
     * @returns PlexSettings OK
     * @throws ApiError
     */
    public getSettingsPlex(): CancelablePromise<PlexSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex',
        });
    }
    /**
     * Update Plex settings
     * Updates Plex settings with the provided values.
     * @param requestBody
     * @returns PlexSettings Values were successfully updated
     * @throws ApiError
     */
    public postSettingsPlex(
        requestBody: PlexSettings,
    ): CancelablePromise<PlexSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/plex',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Plex libraries
     * Returns a list of Plex libraries in a JSON array.
     * @param sync Syncs the current libraries with the current Plex server
     * @param enable Comma separated list of libraries to enable. Any libraries not passed will be disabled!
     * @returns PlexLibrary Plex libraries returned
     * @throws ApiError
     */
    public getSettingsPlexLibrary(
        sync?: string | null,
        enable?: string | null,
    ): CancelablePromise<Array<PlexLibrary>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex/library',
            query: {
                'sync': sync,
                'enable': enable,
            },
        });
    }
    /**
     * Get status of full Plex library scan
     * Returns scan progress in a JSON array.
     * @returns any Status of Plex scan
     * @throws ApiError
     */
    public getSettingsPlexSync(): CancelablePromise<{
        running?: boolean;
        progress?: number;
        total?: number;
        currentLibrary?: PlexLibrary;
        libraries?: Array<PlexLibrary>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex/sync',
        });
    }
    /**
     * Start full Plex library scan
     * Runs a full Plex library scan and returns the progress in a JSON array.
     * @param requestBody
     * @returns any Status of Plex scan
     * @throws ApiError
     */
    public postSettingsPlexSync(
        requestBody?: {
            cancel?: boolean;
            start?: boolean;
        },
    ): CancelablePromise<{
        running?: boolean;
        progress?: number;
        total?: number;
        currentLibrary?: PlexLibrary;
        libraries?: Array<PlexLibrary>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/plex/sync',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets the user's available Plex servers
     * Returns a list of available Plex servers and their connectivity state
     * @returns PlexDevice OK
     * @throws ApiError
     */
    public getSettingsPlexDevicesServers(): CancelablePromise<Array<PlexDevice>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex/devices/servers',
        });
    }
    /**
     * Get Plex users
     * Returns a list of Plex users in a JSON array.
     *
     * Requires the `MANAGE_USERS` permission.
     *
     * @returns any Plex users
     * @throws ApiError
     */
    public getSettingsPlexUsers(): CancelablePromise<Array<{
        id?: string;
        title?: string;
        username?: string;
        email?: string;
        thumb?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/plex/users',
        });
    }
    /**
     * Get Tautulli settings
     * Retrieves current Tautulli settings.
     * @returns TautulliSettings OK
     * @throws ApiError
     */
    public getSettingsTautulli(): CancelablePromise<TautulliSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/tautulli',
        });
    }
    /**
     * Update Tautulli settings
     * Updates Tautulli settings with the provided values.
     * @param requestBody
     * @returns TautulliSettings Values were successfully updated
     * @throws ApiError
     */
    public postSettingsTautulli(
        requestBody: TautulliSettings,
    ): CancelablePromise<TautulliSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/tautulli',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Radarr settings
     * Returns all Radarr settings in a JSON array.
     * @returns RadarrSettings Values were returned
     * @throws ApiError
     */
    public getSettingsRadarr(): CancelablePromise<Array<RadarrSettings>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/radarr',
        });
    }
    /**
     * Create Radarr instance
     * Creates a new Radarr instance from the request body.
     * @param requestBody
     * @returns RadarrSettings New Radarr instance created
     * @throws ApiError
     */
    public postSettingsRadarr(
        requestBody: RadarrSettings,
    ): CancelablePromise<RadarrSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/radarr',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Radarr configuration
     * Tests if the Radarr configuration is valid. Returns profiles and root folders on success.
     * @param requestBody
     * @returns any Succesfully connected to Radarr instance
     * @throws ApiError
     */
    public postSettingsRadarrTest(
        requestBody: {
            hostname: string;
            port: number;
            apiKey: string;
            useSsl: boolean;
            baseUrl?: string;
        },
    ): CancelablePromise<{
        profiles?: Array<ServiceProfile>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/radarr/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update Radarr instance
     * Updates an existing Radarr instance with the provided values.
     * @param radarrId Radarr instance ID
     * @param requestBody
     * @returns RadarrSettings Radarr instance updated
     * @throws ApiError
     */
    public putSettingsRadarr(
        radarrId: number,
        requestBody: RadarrSettings,
    ): CancelablePromise<RadarrSettings> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/settings/radarr/{radarrId}',
            path: {
                'radarrId': radarrId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete Radarr instance
     * Deletes an existing Radarr instance based on the radarrId parameter.
     * @param radarrId Radarr instance ID
     * @returns RadarrSettings Radarr instance updated
     * @throws ApiError
     */
    public deleteSettingsRadarr(
        radarrId: number,
    ): CancelablePromise<RadarrSettings> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/settings/radarr/{radarrId}',
            path: {
                'radarrId': radarrId,
            },
        });
    }
    /**
     * Get available Radarr profiles
     * Returns a list of profiles available on the Radarr server instance in a JSON array.
     * @param radarrId Radarr instance ID
     * @returns ServiceProfile Returned list of profiles
     * @throws ApiError
     */
    public getSettingsRadarrProfiles(
        radarrId: number,
    ): CancelablePromise<Array<ServiceProfile>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/radarr/{radarrId}/profiles',
            path: {
                'radarrId': radarrId,
            },
        });
    }
    /**
     * Get Sonarr settings
     * Returns all Sonarr settings in a JSON array.
     * @returns SonarrSettings Values were returned
     * @throws ApiError
     */
    public getSettingsSonarr(): CancelablePromise<Array<SonarrSettings>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/sonarr',
        });
    }
    /**
     * Create Sonarr instance
     * Creates a new Sonarr instance from the request body.
     * @param requestBody
     * @returns SonarrSettings New Sonarr instance created
     * @throws ApiError
     */
    public postSettingsSonarr(
        requestBody: SonarrSettings,
    ): CancelablePromise<SonarrSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/sonarr',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Sonarr configuration
     * Tests if the Sonarr configuration is valid. Returns profiles and root folders on success.
     * @param requestBody
     * @returns any Succesfully connected to Sonarr instance
     * @throws ApiError
     */
    public postSettingsSonarrTest(
        requestBody: {
            hostname: string;
            port: number;
            apiKey: string;
            useSsl: boolean;
            baseUrl?: string;
        },
    ): CancelablePromise<{
        profiles?: Array<ServiceProfile>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/sonarr/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update Sonarr instance
     * Updates an existing Sonarr instance with the provided values.
     * @param sonarrId Sonarr instance ID
     * @param requestBody
     * @returns SonarrSettings Sonarr instance updated
     * @throws ApiError
     */
    public putSettingsSonarr(
        sonarrId: number,
        requestBody: SonarrSettings,
    ): CancelablePromise<SonarrSettings> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/settings/sonarr/{sonarrId}',
            path: {
                'sonarrId': sonarrId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete Sonarr instance
     * Deletes an existing Sonarr instance based on the sonarrId parameter.
     * @param sonarrId Sonarr instance ID
     * @returns SonarrSettings Sonarr instance updated
     * @throws ApiError
     */
    public deleteSettingsSonarr(
        sonarrId: number,
    ): CancelablePromise<SonarrSettings> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/settings/sonarr/{sonarrId}',
            path: {
                'sonarrId': sonarrId,
            },
        });
    }
    /**
     * Get public settings
     * Returns settings that are not protected or sensitive. Mainly used to determine if the application has been configured for the first time.
     * @returns PublicSettings Public settings returned
     * @throws ApiError
     */
    public getSettingsPublic(): CancelablePromise<PublicSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/public',
        });
    }
    /**
     * Initialize application
     * Sets the app as initialized, allowing the user to navigate to pages other than the setup page.
     * @returns PublicSettings Public settings returned
     * @throws ApiError
     */
    public postSettingsInitialize(): CancelablePromise<PublicSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/initialize',
        });
    }
    /**
     * Get scheduled jobs
     * Returns list of all scheduled jobs and details about their next execution time in a JSON array.
     * @returns Job Scheduled jobs returned
     * @throws ApiError
     */
    public getSettingsJobs(): CancelablePromise<Array<Job>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/jobs',
        });
    }
    /**
     * Invoke a specific job
     * Invokes a specific job to run. Will return the new job status in JSON format.
     * @param jobId
     * @returns Job Invoked job returned
     * @throws ApiError
     */
    public postSettingsJobsRun(
        jobId: string,
    ): CancelablePromise<Job> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/jobs/{jobId}/run',
            path: {
                'jobId': jobId,
            },
        });
    }
    /**
     * Cancel a specific job
     * Cancels a specific job. Will return the new job status in JSON format.
     * @param jobId
     * @returns Job Canceled job returned
     * @throws ApiError
     */
    public postSettingsJobsCancel(
        jobId: string,
    ): CancelablePromise<Job> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/jobs/{jobId}/cancel',
            path: {
                'jobId': jobId,
            },
        });
    }
    /**
     * Modify job schedule
     * Re-registers the job with the schedule specified. Will return the job in JSON format.
     * @param jobId
     * @param requestBody
     * @returns Job Rescheduled job
     * @throws ApiError
     */
    public postSettingsJobsSchedule(
        jobId: string,
        requestBody: {
            schedule?: string;
        },
    ): CancelablePromise<Job> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/jobs/{jobId}/schedule',
            path: {
                'jobId': jobId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a list of active caches
     * Retrieves a list of all active caches and their current stats.
     * @returns any Caches returned
     * @throws ApiError
     */
    public getSettingsCache(): CancelablePromise<{
        imageCache?: {
            tmdb?: {
                size?: number;
                imageCount?: number;
            };
        };
        apiCaches?: Array<{
            id?: string;
            name?: string;
            stats?: {
                hits?: number;
                misses?: number;
                keys?: number;
                ksize?: number;
                vsize?: number;
            };
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/cache',
        });
    }
    /**
     * Flush a specific cache
     * Flushes all data from the cache ID provided
     * @param cacheId
     * @returns void
     * @throws ApiError
     */
    public postSettingsCacheFlush(
        cacheId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/cache/{cacheId}/flush',
            path: {
                'cacheId': cacheId,
            },
        });
    }
    /**
     * Returns logs
     * Returns list of all log items and details
     * @param take
     * @param skip
     * @param filter
     * @param search
     * @returns any Server log returned
     * @throws ApiError
     */
    public getSettingsLogs(
        take?: number | null,
        skip?: number | null,
        filter: 'debug' | 'info' | 'warn' | 'error' | null = 'debug',
        search?: string | null,
    ): CancelablePromise<Array<{
        label?: string;
        level?: string;
        message?: string;
        timestamp?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/logs',
            query: {
                'take': take,
                'skip': skip,
                'filter': filter,
                'search': search,
            },
        });
    }
    /**
     * Get email notification settings
     * Returns current email notification settings in a JSON object.
     * @returns NotificationEmailSettings Returned email settings
     * @throws ApiError
     */
    public getSettingsNotificationsEmail(): CancelablePromise<NotificationEmailSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/email',
        });
    }
    /**
     * Update email notification settings
     * Updates email notification settings with provided values
     * @param requestBody
     * @returns NotificationEmailSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsEmail(
        requestBody: NotificationEmailSettings,
    ): CancelablePromise<NotificationEmailSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test email settings
     * Sends a test notification to the email agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsEmailTest(
        requestBody: NotificationEmailSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/email/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Discord notification settings
     * Returns current Discord notification settings in a JSON object.
     * @returns DiscordSettings Returned Discord settings
     * @throws ApiError
     */
    public getSettingsNotificationsDiscord(): CancelablePromise<DiscordSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/discord',
        });
    }
    /**
     * Update Discord notification settings
     * Updates Discord notification settings with the provided values.
     * @param requestBody
     * @returns DiscordSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsDiscord(
        requestBody: DiscordSettings,
    ): CancelablePromise<DiscordSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/discord',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Discord settings
     * Sends a test notification to the Discord agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsDiscordTest(
        requestBody: DiscordSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/discord/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get LunaSea notification settings
     * Returns current LunaSea notification settings in a JSON object.
     * @returns LunaSeaSettings Returned LunaSea settings
     * @throws ApiError
     */
    public getSettingsNotificationsLunasea(): CancelablePromise<LunaSeaSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/lunasea',
        });
    }
    /**
     * Update LunaSea notification settings
     * Updates LunaSea notification settings with the provided values.
     * @param requestBody
     * @returns LunaSeaSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsLunasea(
        requestBody: LunaSeaSettings,
    ): CancelablePromise<LunaSeaSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/lunasea',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test LunaSea settings
     * Sends a test notification to the LunaSea agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsLunaseaTest(
        requestBody: LunaSeaSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/lunasea/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Pushbullet notification settings
     * Returns current Pushbullet notification settings in a JSON object.
     * @returns PushbulletSettings Returned Pushbullet settings
     * @throws ApiError
     */
    public getSettingsNotificationsPushbullet(): CancelablePromise<PushbulletSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/pushbullet',
        });
    }
    /**
     * Update Pushbullet notification settings
     * Update Pushbullet notification settings with the provided values.
     * @param requestBody
     * @returns PushbulletSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsPushbullet(
        requestBody: PushbulletSettings,
    ): CancelablePromise<PushbulletSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/pushbullet',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Pushbullet settings
     * Sends a test notification to the Pushbullet agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsPushbulletTest(
        requestBody: PushbulletSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/pushbullet/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Pushover notification settings
     * Returns current Pushover notification settings in a JSON object.
     * @returns PushoverSettings Returned Pushover settings
     * @throws ApiError
     */
    public getSettingsNotificationsPushover(): CancelablePromise<PushoverSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/pushover',
        });
    }
    /**
     * Update Pushover notification settings
     * Update Pushover notification settings with the provided values.
     * @param requestBody
     * @returns PushoverSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsPushover(
        requestBody: PushoverSettings,
    ): CancelablePromise<PushoverSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/pushover',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Pushover settings
     * Sends a test notification to the Pushover agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsPushoverTest(
        requestBody: PushoverSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/pushover/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Pushover sounds
     * Returns valid Pushover sound options in a JSON array.
     * @param token
     * @returns any Returned Pushover settings
     * @throws ApiError
     */
    public getSettingsNotificationsPushoverSounds(
        token: string,
    ): CancelablePromise<Array<{
        name?: string;
        description?: string;
    }>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/pushover/sounds',
            query: {
                'token': token,
            },
        });
    }
    /**
     * Get Gotify notification settings
     * Returns current Gotify notification settings in a JSON object.
     * @returns GotifySettings Returned Gotify settings
     * @throws ApiError
     */
    public getSettingsNotificationsGotify(): CancelablePromise<GotifySettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/gotify',
        });
    }
    /**
     * Update Gotify notification settings
     * Update Gotify notification settings with the provided values.
     * @param requestBody
     * @returns GotifySettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsGotify(
        requestBody: GotifySettings,
    ): CancelablePromise<GotifySettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/gotify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Gotify settings
     * Sends a test notification to the Gotify agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsGotifyTest(
        requestBody: GotifySettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/gotify/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Slack notification settings
     * Returns current Slack notification settings in a JSON object.
     * @returns SlackSettings Returned slack settings
     * @throws ApiError
     */
    public getSettingsNotificationsSlack(): CancelablePromise<SlackSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/slack',
        });
    }
    /**
     * Update Slack notification settings
     * Updates Slack notification settings with the provided values.
     * @param requestBody
     * @returns SlackSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsSlack(
        requestBody: SlackSettings,
    ): CancelablePromise<SlackSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/slack',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Slack settings
     * Sends a test notification to the Slack agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsSlackTest(
        requestBody: SlackSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/slack/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Telegram notification settings
     * Returns current Telegram notification settings in a JSON object.
     * @returns TelegramSettings Returned Telegram settings
     * @throws ApiError
     */
    public getSettingsNotificationsTelegram(): CancelablePromise<TelegramSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/telegram',
        });
    }
    /**
     * Update Telegram notification settings
     * Update Telegram notification settings with the provided values.
     * @param requestBody
     * @returns TelegramSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsTelegram(
        requestBody: TelegramSettings,
    ): CancelablePromise<TelegramSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/telegram',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Telegram settings
     * Sends a test notification to the Telegram agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsTelegramTest(
        requestBody: TelegramSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/telegram/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Web Push notification settings
     * Returns current Web Push notification settings in a JSON object.
     * @returns WebPushSettings Returned web push settings
     * @throws ApiError
     */
    public getSettingsNotificationsWebpush(): CancelablePromise<WebPushSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/webpush',
        });
    }
    /**
     * Update Web Push notification settings
     * Updates Web Push notification settings with the provided values.
     * @param requestBody
     * @returns WebPushSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsWebpush(
        requestBody: WebPushSettings,
    ): CancelablePromise<WebPushSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/webpush',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test Web Push settings
     * Sends a test notification to the Web Push agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsWebpushTest(
        requestBody: WebPushSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/webpush/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get webhook notification settings
     * Returns current webhook notification settings in a JSON object.
     * @returns WebhookSettings Returned webhook settings
     * @throws ApiError
     */
    public getSettingsNotificationsWebhook(): CancelablePromise<WebhookSettings> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/notifications/webhook',
        });
    }
    /**
     * Update webhook notification settings
     * Updates webhook notification settings with the provided values.
     * @param requestBody
     * @returns WebhookSettings Values were sucessfully updated
     * @throws ApiError
     */
    public postSettingsNotificationsWebhook(
        requestBody: WebhookSettings,
    ): CancelablePromise<WebhookSettings> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/webhook',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Test webhook settings
     * Sends a test notification to the webhook agent.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public postSettingsNotificationsWebhookTest(
        requestBody: WebhookSettings,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/notifications/webhook/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all discover sliders
     * Returns all discovery sliders. Built-in and custom made.
     * @returns DiscoverSlider Returned all discovery sliders
     * @throws ApiError
     */
    public getSettingsDiscover(): CancelablePromise<Array<DiscoverSlider>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/discover',
        });
    }
    /**
     * Batch update all sliders.
     * Batch update all sliders at once. Should also be used for creation. Will only update sliders provided
     * and will not delete any sliders not present in the request. If a slider is missing a required field,
     * it will be ignored. Requires the `ADMIN` permission.
     *
     * @param requestBody
     * @returns DiscoverSlider Returned all newly updated discovery sliders
     * @throws ApiError
     */
    public postSettingsDiscover(
        requestBody: Array<DiscoverSlider>,
    ): CancelablePromise<Array<DiscoverSlider>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/discover',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a single slider
     * Updates a single slider and return the newly updated slider. Requires the `ADMIN` permission.
     *
     * @param requestBody
     * @returns DiscoverSlider Returns newly added discovery slider
     * @throws ApiError
     */
    public putSettingsDiscover(
        requestBody: {
            title?: string;
            type?: number;
            data?: string;
        },
    ): CancelablePromise<DiscoverSlider> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/settings/discover/{sliderId}',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete slider by ID
     * Deletes the slider with the provided sliderId. Requires the `ADMIN` permission.
     * @param sliderId
     * @returns DiscoverSlider Slider successfully deleted
     * @throws ApiError
     */
    public deleteSettingsDiscover(
        sliderId: number,
    ): CancelablePromise<DiscoverSlider> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/settings/discover/{sliderId}',
            path: {
                'sliderId': sliderId,
            },
        });
    }
    /**
     * Add a new slider
     * Add a single slider and return the newly created slider. Requires the `ADMIN` permission.
     *
     * @param requestBody
     * @returns DiscoverSlider Returns newly added discovery slider
     * @throws ApiError
     */
    public postSettingsDiscoverAdd(
        requestBody: {
            title?: string;
            type?: number;
            data?: string;
        },
    ): CancelablePromise<DiscoverSlider> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/settings/discover/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset all discover sliders
     * Resets all discovery sliders to the default values. Requires the `ADMIN` permission.
     * @returns void
     * @throws ApiError
     */
    public getSettingsDiscoverReset(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/discover/reset',
        });
    }
    /**
     * Get server stats
     * Returns current server stats in a JSON object.
     * @returns any Returned about settings
     * @throws ApiError
     */
    public getSettingsAbout(): CancelablePromise<{
        version?: string;
        totalRequests?: number;
        totalMediaItems?: number;
        tz?: string | null;
        appDataPath?: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/settings/about',
        });
    }
}
