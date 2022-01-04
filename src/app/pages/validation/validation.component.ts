import { pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Observable } from 'rxjs';
import { Deposit } from 'src/models/deposit';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit, AfterViewInit {
  depositsForValidation: Observable<Deposit[]>;
  @ViewChild('useAsScrollToTopAnchor') anchor: ElementRef;

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private router: Router,) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.depositsForValidation = this.route.data.pipe(pluck('resolveDepositsForValidation'));
  }

  ngAfterViewInit(): void {
    this.anchor.nativeElement.scrollIntoView(0);
  }

  /**
   * Reload our view, and thus its data
   */
  reloadView(): void {
    this.router.navigated = false;
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
