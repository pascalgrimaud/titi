import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MsIgniteSharedModule } from 'app/shared/shared.module';
import { ConferenceComponent } from './conference.component';
import { ConferenceDetailComponent } from './conference-detail.component';
import { ConferenceUpdateComponent } from './conference-update.component';
import { ConferenceDeletePopupComponent, ConferenceDeleteDialogComponent } from './conference-delete-dialog.component';
import { conferenceRoute, conferencePopupRoute } from './conference.route';

const ENTITY_STATES = [...conferenceRoute, ...conferencePopupRoute];

@NgModule({
  imports: [MsIgniteSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConferenceComponent,
    ConferenceDetailComponent,
    ConferenceUpdateComponent,
    ConferenceDeleteDialogComponent,
    ConferenceDeletePopupComponent
  ],
  entryComponents: [ConferenceDeleteDialogComponent]
})
export class MsIgniteConferenceModule {}
