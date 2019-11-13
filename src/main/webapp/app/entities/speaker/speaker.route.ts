import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Speaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';
import { SpeakerDeletePopupComponent } from './speaker-delete-dialog.component';
import { ISpeaker } from 'app/shared/model/speaker.model';

@Injectable({ providedIn: 'root' })
export class SpeakerResolve implements Resolve<ISpeaker> {
  constructor(private service: SpeakerService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpeaker> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((speaker: HttpResponse<Speaker>) => speaker.body));
    }
    return of(new Speaker());
  }
}

export const speakerRoute: Routes = [
  {
    path: '',
    component: SpeakerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.speaker.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpeakerDetailComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.speaker.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.speaker.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.speaker.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const speakerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SpeakerDeletePopupComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'msIgniteApp.speaker.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
