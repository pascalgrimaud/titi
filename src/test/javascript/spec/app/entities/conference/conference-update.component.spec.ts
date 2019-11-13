import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MsIgniteTestModule } from '../../../test.module';
import { ConferenceUpdateComponent } from 'app/entities/conference/conference-update.component';
import { ConferenceService } from 'app/entities/conference/conference.service';
import { Conference } from 'app/shared/model/conference.model';

describe('Component Tests', () => {
  describe('Conference Management Update Component', () => {
    let comp: ConferenceUpdateComponent;
    let fixture: ComponentFixture<ConferenceUpdateComponent>;
    let service: ConferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MsIgniteTestModule],
        declarations: [ConferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conference(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conference();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
