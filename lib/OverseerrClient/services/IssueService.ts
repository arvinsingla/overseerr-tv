/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Issue } from '../models/Issue';
import type { IssueComment } from '../models/IssueComment';
import type { PageInfo } from '../models/PageInfo';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IssueService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get all issues
     * Returns a list of issues in JSON format.
     *
     * @param take
     * @param skip
     * @param sort
     * @param filter
     * @param requestedBy
     * @returns any Issues returned
     * @throws ApiError
     */
    public getIssue(
        take?: number | null,
        skip?: number | null,
        sort: 'added' | 'modified' = 'added',
        filter: 'all' | 'open' | 'resolved' = 'open',
        requestedBy?: number | null,
    ): CancelablePromise<{
        pageInfo?: PageInfo;
        results?: Array<Issue>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/issue',
            query: {
                'take': take,
                'skip': skip,
                'sort': sort,
                'filter': filter,
                'requestedBy': requestedBy,
            },
        });
    }
    /**
     * Create new issue
     * Creates a new issue
     *
     * @param requestBody
     * @returns Issue Succesfully created the issue
     * @throws ApiError
     */
    public postIssue(
        requestBody: {
            issueType?: number;
            message?: string;
            mediaId?: number;
        },
    ): CancelablePromise<Issue> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/issue',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Gets issue counts
     * Returns the number of open and closed issues, as well as the number of issues of each type.
     *
     * @returns any Issue counts returned
     * @throws ApiError
     */
    public getIssueCount(): CancelablePromise<{
        total?: number;
        video?: number;
        audio?: number;
        subtitles?: number;
        others?: number;
        open?: number;
        closed?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/issue/count',
        });
    }
    /**
     * Get issue
     * Returns a single issue in JSON format.
     *
     * @param issueId
     * @returns Issue Issues returned
     * @throws ApiError
     */
    public getIssue1(
        issueId: number,
    ): CancelablePromise<Issue> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/issue/{issueId}',
            path: {
                'issueId': issueId,
            },
        });
    }
    /**
     * Delete issue
     * Removes an issue. If the user has the `MANAGE_ISSUES` permission, any issue can be removed. Otherwise, only a users own issues can be removed.
     * @param issueId Issue ID
     * @returns void
     * @throws ApiError
     */
    public deleteIssue(
        issueId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/issue/{issueId}',
            path: {
                'issueId': issueId,
            },
        });
    }
    /**
     * Create a comment
     * Creates a comment and returns associated issue in JSON format.
     *
     * @param issueId
     * @param requestBody
     * @returns Issue Issue returned with new comment
     * @throws ApiError
     */
    public postIssueComment(
        issueId: number,
        requestBody: {
            message: string;
        },
    ): CancelablePromise<Issue> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/issue/{issueId}/comment',
            path: {
                'issueId': issueId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get issue comment
     * Returns a single issue comment in JSON format.
     *
     * @param commentId
     * @returns IssueComment Comment returned
     * @throws ApiError
     */
    public getIssueComment(
        commentId: string,
    ): CancelablePromise<IssueComment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/issueComment/{commentId}',
            path: {
                'commentId': commentId,
            },
        });
    }
    /**
     * Update issue comment
     * Updates and returns a single issue comment in JSON format.
     *
     * @param commentId
     * @param requestBody
     * @returns IssueComment Comment updated
     * @throws ApiError
     */
    public putIssueComment(
        commentId: string,
        requestBody: {
            message?: string;
        },
    ): CancelablePromise<IssueComment> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/issueComment/{commentId}',
            path: {
                'commentId': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete issue comment
     * Deletes an issue comment. Only users with `MANAGE_ISSUES` or the user who created the comment can perform this action.
     *
     * @param commentId Issue Comment ID
     * @returns void
     * @throws ApiError
     */
    public deleteIssueComment(
        commentId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/issueComment/{commentId}',
            path: {
                'commentId': commentId,
            },
        });
    }
    /**
     * Update an issue's status
     * Updates an issue's status to approved or declined. Also returns the issue in a JSON object.
     *
     * Requires the `MANAGE_ISSUES` permission or `ADMIN`.
     *
     * @param issueId Issue ID
     * @param status New status
     * @returns Issue Issue status changed
     * @throws ApiError
     */
    public postIssue1(
        issueId: string,
        status: 'open' | 'resolved',
    ): CancelablePromise<Issue> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/issue/{issueId}/{status}',
            path: {
                'issueId': issueId,
                'status': status,
            },
        });
    }
}
