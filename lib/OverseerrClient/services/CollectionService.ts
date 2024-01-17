/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from '../models/Collection';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CollectionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get collection details
     * Returns full collection details in a JSON object.
     * @param collectionId
     * @param language
     * @returns Collection Collection details
     * @throws ApiError
     */
    public getCollection(
        collectionId: number,
        language?: string,
    ): CancelablePromise<Collection> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/collection/{collectionId}',
            path: {
                'collectionId': collectionId,
            },
            query: {
                'language': language,
            },
        });
    }
}
