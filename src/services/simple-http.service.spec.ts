import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SimpleHttpService } from "./simple-http.service"
import { LoadingFeedbackService } from "./feedback.service";

describe('SimpleHttpService', () => {
    let simpleHttpService: SimpleHttpService,
        httpTestingController: HttpTestingController,
        feedbackAnimationSpy: any;

    beforeEach(() => {
        feedbackAnimationSpy = jasmine.createSpyObj('LoadingFeedbackService',
            ['show', 'showError', 'loading', 'doneLoading']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: LoadingFeedbackService, useValue: feedbackAnimationSpy }
            ]
        })

        simpleHttpService = TestBed.inject(SimpleHttpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should fetch data', () => {
        simpleHttpService.receive<any[]>('')
            .subscribe(data => {
                expect(data).toBeTruthy('No data returned');
                expect(data.length).toBeGreaterThan(0, 'We have less than one values');
            });
        expect(feedbackAnimationSpy.loading).toHaveBeenCalledTimes(1);

        const req = httpTestingController.expectOne('');
        expect(req.request.method).toEqual('GET');
        req.flush({ data: [{}, {}, {}] });
    })
})