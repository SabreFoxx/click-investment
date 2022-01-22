import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swiper, { SwiperOptions, EffectCoverflow, Pagination } from 'swiper';
import { loadPlanDataForApexChartSeries } from 'src/adjectives/functions'

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
  currentlyDisplayedPlan = new Subject<Plan>();
  @ViewChild(ChartComponent) chart: ChartComponent;

  private subscriptions = new Array<Subscription>();

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
    this.subscriptions.push(
      this.plans.pipe(map(plans => {
        const planNames = plans.map(plan => plan.name)
        const planAmounts = plans.map(plan => {
          return parseInt(plan.DailyInterests[plan.DailyInterests?.length - 1]?.gross)
        })
        const profileColors = plans.map(plan => plan.profileColor)
        return [planNames, planAmounts, profileColors]
      })).subscribe(attributes => {
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
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.currentlyDisplayedPlan.subscribe(plan => {
        this.planStatOptions.series = [{
          data: loadPlanDataForApexChartSeries(plan)
        }];
        this.planStatOptions.colors = [plan?.profileColor]
      })
    );

    // set initial stat to display in larger pane
    this.subscriptions.push(
      this.plans.subscribe(plans => {
        this.currentlyDisplayedPlan.next(plans[0]);
      })
    );

    // fixes a bug whereby <top-bar> isn't visible on login, on mobile
    document.documentElement.scrollTop = 0;
  }

  display(plan: Plan) {
    this.currentlyDisplayedPlan.next(plan);
  }

  onSwiper(swiper) { }

  onSlideChange() { }

}
