import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MsIgniteSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [MsIgniteSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class MsIgniteHomeModule {}
