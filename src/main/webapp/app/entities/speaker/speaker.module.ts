import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MsIgniteSharedModule } from 'app/shared/shared.module';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';
import { SpeakerDeletePopupComponent, SpeakerDeleteDialogComponent } from './speaker-delete-dialog.component';
import { speakerRoute, speakerPopupRoute } from './speaker.route';

const ENTITY_STATES = [...speakerRoute, ...speakerPopupRoute];

@NgModule({
  imports: [MsIgniteSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SpeakerComponent,
    SpeakerDetailComponent,
    SpeakerUpdateComponent,
    SpeakerDeleteDialogComponent,
    SpeakerDeletePopupComponent
  ],
  entryComponents: [SpeakerDeleteDialogComponent]
})
export class MsIgniteSpeakerModule {}
