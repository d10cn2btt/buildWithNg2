import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {gitHubUser} from "../model/github-user";
import {UserSearchService} from "../service/user-search.service";

import * as moment from 'moment';

@Component({
    selector: 'form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['form-search.component.scss']
})

export class FormSearchComponent implements OnInit {
    protected txtSearch = new Subject<string>();
    listUser$: Observable<gitHubUser[]>;
    protected userGit: gitHubUser;
    protected listRepo;
    hideResultSearch = true;
    keySearch = '';

    constructor(private userSearchService: UserSearchService) {
        document.addEventListener('click', this.offClickHandler.bind(this));
    }

    offClickHandler() {
        this.hideResultSearch = true;
    }

    search(keySearch: string): void {
        this.hideResultSearch = false;
        this.txtSearch.next(keySearch);
    }

    ngOnInit() {
        this.listUser$ = this.txtSearch
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            // It cancels and discards previous search observables, returning only the latest search service observable.
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.userSearchService.searchUser(term)
                // or the observable of empty heroes if no search term
                : Observable.of<gitHubUser[]>([])
            )
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<gitHubUser[]>([]);
            });
    }

    findUser(user) {
        this.keySearch = user.login;
        this.userSearchService.findUser(user.login)
            .then(response => {
                this.userGit = response;
                return response.repos_url;
            })
            .then(
                (urlRepo) => {
                    this.userSearchService.searchRepo(urlRepo)
                        .then(response => this.listRepo = response);
                }
            )
    }
}
