/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditCast } from '../models/CreditCast';
import type { CreditCrew } from '../models/CreditCrew';
import type { PersonDetails } from '../models/PersonDetails';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PersonService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get person details
     * Returns person details based on provided personId in a JSON object.
     * @param personId
     * @param language
     * @returns PersonDetails Returned person
     * @throws ApiError
     */
    public getPerson(
        personId: number,
        language?: string,
    ): CancelablePromise<PersonDetails> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/person/{personId}',
            path: {
                'personId': personId,
            },
            query: {
                'language': language,
            },
        });
    }
    /**
     * Get combined credits
     * Returns the person's combined credits based on the provided personId in a JSON object.
     * @param personId
     * @param language
     * @returns any Returned combined credits
     * @throws ApiError
     */
    public getPersonCombinedCredits(
        personId: number,
        language?: string,
    ): CancelablePromise<{
        cast?: Array<CreditCast>;
        crew?: Array<CreditCrew>;
        id?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/person/{personId}/combined_credits',
            path: {
                'personId': personId,
            },
            query: {
                'language': language,
            },
        });
    }
}
