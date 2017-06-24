/**
 * Created by truongbt on 24/06/2017.
 */
import {gitHubUser} from '../model/github-user';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

@Injectable()
export class UserSearchService {
    private urlSearch = 'https://api.github.com/search/users?q=';

    constructor(private http: Http) {

    }

    searchUser(keySearch: string): Promise<gitHubUser[]> {
        console.log('123123');
        return this.http
            .get(this.urlSearch + keySearch)
            .toPromise()
            .then(response => response.json().items)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}