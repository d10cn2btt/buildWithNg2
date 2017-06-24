import {Component, OnInit} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {gitHubUser} from "../model/github-user";
import {UserSearchService} from "../service/user-search.service";

@Component({
    selector: 'form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['form-search.component.scss']
})

export class FormSearchComponent implements OnInit {
    protected txtSearch = new Subject<string>();
    listUser$: Observable<gitHubUser[]>;
    testShow = true;

    constructor(private userSearchService: UserSearchService) {
    }

    search(keySearch: string): void {
        this.txtSearch.next(keySearch);
    }

    ngOnInit() {
        this.listUser$ = this.txtSearch
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
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

    hack(val) {
        return Array.from(val);
    }

}
