import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IConference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';

@Component({
  selector: 'jhi-conference',
  templateUrl: './conference.component.html'
})
export class ConferenceComponent implements OnInit, OnDestroy {
  conferences: IConference[];
  eventSubscriber: Subscription;

  constructor(protected conferenceService: ConferenceService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.conferenceService.query().subscribe((res: HttpResponse<IConference[]>) => {
      this.conferences = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInConferences();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConference) {
    return item.id;
  }

  registerChangeInConferences() {
    this.eventSubscriber = this.eventManager.subscribe('conferenceListModification', () => this.loadAll());
  }
}
