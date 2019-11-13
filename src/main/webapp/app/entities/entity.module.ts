import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'speaker',
        loadChildren: () => import('./speaker/speaker.module').then(m => m.MsIgniteSpeakerModule)
      },
      {
        path: 'conference',
        loadChildren: () => import('./conference/conference.module').then(m => m.MsIgniteConferenceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MsIgniteEntityModule {}
