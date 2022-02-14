import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { delay, map, pluck, takeUntil } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swiper, { SwiperOptions, EffectCoverflow, Pagination } from 'swiper';
import { loadPlanDataForApexChartSeries } from 'src/adjectives/functions';

Swiper.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatComponent implements OnInit, OnDestroy {
  plans: Observable<Plan[]>;
  swiperConfig: SwiperOptions;
  pieChartOptions: any;
  planStatOptions: any;
  currentlyDisplayedPlan = new BehaviorSubject<Plan>(null);
  @ViewChild(ChartComponent) chart: ChartComponent;

  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/stats', title: 'Stats' }]);

    this.swiperConfig = {
      effect: 'coverflow',
      grabCursor: true,
      slidesPerView: 'auto',
      pagination: true,
      allowTouchMove: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }
    };

    this.pieChartOptions = {
      series: [],
      chart: {
        type: "donut",
        height: '400px',
        width: '400px'
      },
      labels: [],
      fill: {},
      lagend: {}
    };

    this.planStatOptions = {
      chart: {
        id: "planStat",
        type: "area",
        height: 230,
        foreColor: "#5a5a5a",
        toolbar: {
          show: false
        }
      },
      colors: ["#5b9571"],
      stroke: {
        width: 3
      },
      grid: {
        borderColor: "#5a5a5a",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      markers: {
        size: 5,
        colors: ["#5a5a5a"],
        strokeColor: "#005F82",
        strokeWidth: 3
      },
      series: [],
      tooltip: {
        theme: "dark"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        min: 0,
        tickAmount: 4
      }
    };
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'));

    // setup pie chart
    this.plans.pipe(map(plans => {
      const planNames = plans.map(plan => plan.name)
      const planAmounts = plans.map(plan => {
        return parseInt(plan.DailyInterests[plan.DailyInterests?.length - 1]?.gross)
      })
      const profileColors = plans.map(plan => plan.profileColor)
      return [planNames, planAmounts, profileColors]
    }), takeUntil(this.subscriptions)).subscribe(attributes => {
      const [planNames, planAmounts, profileColors] = attributes;
      this.pieChartOptions = {
        series: planAmounts,
        chart: {
          type: 'donut',
          width: '350px',
          height: '350px'
        },
        labels: planNames,
        legend: {
          markers: {
            fillColors: profileColors
          }
        },
        fill: {
          colors: profileColors
        }
      }
    });

    // set initial stat to display in larger pane
    this.plans.pipe(takeUntil(this.subscriptions))
      .subscribe(plans => {
        this.currentlyDisplayedPlan.next(plans[0]);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  ngAfterViewInit(): void {
    // draw graph
    this.currentlyDisplayedPlan
      .pipe(delay(500), takeUntil(this.subscriptions)) // delay() fixes a bug
      .subscribe(plan => {
        this.planStatOptions.series = [{
          data: loadPlanDataForApexChartSeries(plan)
        }];
        this.planStatOptions.colors = [plan?.profileColor]
      });

    this.ui.isSideMenuVisible
      .pipe(takeUntil(this.subscriptions))
      .subscribe(v => this.currentlyDisplayedPlan.next(this.currentlyDisplayedPlan.value));

    this.ui.isNotificationPaneVisible
      .pipe(takeUntil(this.subscriptions))
      .subscribe(v => this.currentlyDisplayedPlan.next(this.currentlyDisplayedPlan.value));
  }

  display(plan: Plan) {
    this.currentlyDisplayedPlan.next(plan);
  }

  onSwiper(swiper) { }

  onSlideChange() { }

}
