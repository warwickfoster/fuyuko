import {DashboardWidget, DashboardWidgetInfo} from '../../../../model/dashboard.model';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DashboardWidgetService} from '../../../../service/dashboard-service/dashboard-widget.service';
import {MatOptionSelectionChange} from "@angular/material/core";
import {AuthService} from "../../../../service/auth-service/auth.service";

export interface Location {
    displayName: string;
    internalName: string;
}

/**
 *  clock widget
 *  https://www.zeitverschiebung.net/en/clock-widget?size=large&timezone=Australia/Sydney&type=city&id=2147714#location
 */

@Component({
    templateUrl: './clock-widget.component.html',
    styleUrls: ['./clock-widget.component.scss']
})
export class ClockWidgetComponent extends DashboardWidget implements OnInit, AfterViewInit {

    readonly locations: Location[] = [
        {
            displayName: `Los Angeles, United States`,
            internalName: `America%2FLos_Angeles`
        },
        {
            displayName: `Kuching, Malaysia`,
            internalName: `Asia%2FKuching`
        },
        {
            displayName: `Sydney, Australia`,
            internalName: `Australia%2FSydney`
        },
        {
            displayName: `London, United Kingdom`,
            internalName: `Europe%2FLondon`
        },
        {
            displayName: `Perth, Australia`,
            internalName: `Australia%2FPerth`
        }
    ];

    id = ClockWidgetComponent.info().id;
    name = ClockWidgetComponent.info().name;

    currentLocation: Location;

    static info(): DashboardWidgetInfo {
        return { id: 'clock-widget', name: 'clock-widget', type: ClockWidgetComponent };
    }

    constructor(dashboardWidgetService: DashboardWidgetService) {
        super(dashboardWidgetService);
    }

    ngOnInit(): void {
        this.currentLocation = this.locations[0];
        console.log('&&&&&& [clock-widget] init', this.dashboardWidgetService.widgetInstance, this.dashboardWidgetService.currentUser);
    }

    ngAfterViewInit(): void {
        console.log('&&&&&& [clock-widget] after view init', this.dashboardWidgetService.widgetInstance, this.dashboardWidgetService.currentUser);
    }

    onLocationChange($event: MatOptionSelectionChange) {
        const location: Location = $event.source.value as Location;
        this.currentLocation = location;
    }
}
