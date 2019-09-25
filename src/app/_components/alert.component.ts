import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles:[`
        .alert{
            position: absolute;
            padding: 10px;
            background: #0F006D;
            color: #fff;
            border-radius: 20px;
            bottom: 5px;
            opacity: .8;
            left: 20%;
            transition: .3s;
        }`
    ]
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message;
            setTimeout(()=>{  
                this.message = undefined;
            }, 1000);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}