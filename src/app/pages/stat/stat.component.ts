import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Observable, Subscription } from 'rxjs';
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
  planStatBrushOptions: any;
  @ViewChild(ChartComponent) chart: ChartComponent;
  private currentlyDetailedPlan: Plan;

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

    this.planStatBrushOptions = {
      chart: {
        id: "planStatBrush",
        height: 110,
        type: "bar",
        foreColor: "#5a5a5a",
        brush: {
          target: "planStat",
          enabled: true,
          autoScaleYaxis: false
        },
        selection: {
          enabled: true,
          fill: {
            color: "#5a5a5a",
            opacity: 0.4
          },
          xaxis: {
            min: new Date('2021-11-15T12:48:30.739Z').getTime(),
            max: new Date('2021-11-16T12:48:30.739Z').getTime()
          }
        }
      },
      colors: ["#5b9571"],
      series: [{
        data: []
      }],
      stroke: {
        width: 2
      },
      grid: {
        borderColor: "#5a5a5a"
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2
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
            width: '400px',
            height: '400px'
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
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    // set initial stat to display in larger pane
    this.subscriptions.push(
      this.plans.subscribe(plans => {
        setTimeout(() => { // fixes a ui bug
          this.display(plans[0])
        }, 700);
      }),

      // each time we toggle side menu, redraw our plan graph
      this.ui.isSideMenuVisible.subscribe(() => {
        setTimeout(() => { // fixes a ui bug
          this.display(this.currentlyDetailedPlan) // changing data causes a redraw
        }, 701);
      })
    );
  }

  display(plan: Plan) {
    this.currentlyDetailedPlan = plan;

    this.planStatOptions.series = [{
      data: loadPlanDataForApexChartSeries(plan)
    }];
    this.planStatOptions.colors = [plan?.profileColor]

    this.planStatBrushOptions.series = [{
      data: loadPlanDataForApexChartSeries(plan)
    }];
    this.planStatBrushOptions.colors = [plan?.profileColor]
  }

  onSwiper(swiper) { }

  onSlideChange() { }

}
