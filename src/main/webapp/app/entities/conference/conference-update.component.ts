import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IConference, Conference } from 'app/shared/model/conference.model';
import { ConferenceService } from './conference.service';
import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from 'app/entities/speaker/speaker.service';

@Component({
  selector: 'jhi-conference-update',
  templateUrl: './conference-update.component.html'
})
export class ConferenceUpdateComponent implements OnInit {
  isSaving: boolean;

  speakers: ISpeaker[];

  editForm = this.fb.group({
    id: [],
    name: [],
    schedule: [],
    speaker: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected conferenceService: ConferenceService,
    protected speakerService: SpeakerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ conference }) => {
      this.updateForm(conference);
    });
    this.speakerService
      .query()
      .subscribe((res: HttpResponse<ISpeaker[]>) => (this.speakers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(conference: IConference) {
    this.editForm.patchValue({
      id: conference.id,
      name: conference.name,
      schedule: conference.schedule != null ? conference.schedule.format(DATE_TIME_FORMAT) : null,
      speaker: conference.speaker
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const conference = this.createFromForm();
    if (conference.id !== undefined) {
      this.subscribeToSaveResponse(this.conferenceService.update(conference));
    } else {
      this.subscribeToSaveResponse(this.conferenceService.create(conference));
    }
  }

  private createFromForm(): IConference {
    return {
      ...new Conference(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      schedule: this.editForm.get(['schedule']).value != null ? moment(this.editForm.get(['schedule']).value, DATE_TIME_FORMAT) : undefined,
      speaker: this.editForm.get(['speaker']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConference>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackSpeakerById(index: number, item: ISpeaker) {
    return item.id;
  }
}
