import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
  selector: 'jhi-speaker',
  templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
  speakers: ISpeaker[];
  eventSubscriber: Subscription;

  constructor(protected speakerService: SpeakerService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.speakerService.query().subscribe((res: HttpResponse<ISpeaker[]>) => {
      this.speakers = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInSpeakers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISpeaker) {
    return item.id;
  }

  registerChangeInSpeakers() {
    this.eventSubscriber = this.eventManager.subscribe('speakerListModification', () => this.loadAll());
  }
}
