/**
 * Created by truongbt on 24/06/2017.
 */
import {gitHubUser} from '../model/github-user';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserSearchService {
    private clientId = 'f1aaa1a8fec2ce3ea647';
    private clientSecret = 'e79331a5dfc7518cc09d192bf5e6d6346c72b1dd';
    private urlSearch = 'https://api.github.com/search/users?q=';

    constructor(private http: Http) {

    }

    /**
     * @param keySearch
     * @returns {Promise<any|TResult2|TResult1>}
     * Observables: Each Http service method returns an Observable of HTTP Response objects.
     * The Angular http.get returns an RxJS Observable
     * converted the Observable to a Promise using the toPromise operator.
     */
    searchUser(keySearch: string): Promise<gitHubUser[]> {
        return this.http
            .get(this.urlSearch + keySearch
                + "&client_id" + this.clientId
                + "&client_secret" + this.clientSecret
            )
            .toPromise()
            .then(response => response.json().items)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}