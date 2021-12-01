import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    value:any;
    data =[{colorName: 'sky', 
    hexValues: ['#076cab', '#8cc4e4', '#045692',"#597fa2","#a0b9d4","#49719b"]},
    {colorName: 'lemon', 
    hexValues: ['#e4af08', '#f7d665', '#803a04','#937105','#917207','#944304']}]
    colordata: { colorName: string; hexValues: string[]; }[];
    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
    isSearch(){
     
        this.colordata = this.data.filter((colorn)=>{return colorn.colorName  == this.value});

    }
}