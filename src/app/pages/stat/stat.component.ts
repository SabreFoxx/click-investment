import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
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
export class StatComponent implements OnInit {
  plans: Observable<Plan[]>;
  swiperConfig: SwiperOptions;
  pieChartOptions: any;
  planStatOptions: any;
  planStatBrushOptions: any;
  @ViewChild(ChartComponent) chart: ChartComponent;

  constructor(private route: ActivatedRoute) {
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
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut",
        height: '400px',
        width: '400px'
      },
      labels: ["Platinum", "Gold", "Diamond", "Emerald", "Gold"],
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
    this.plans = this.route.data.pipe(pluck('resolvePlans'), pluck('plans'));
  }

  ngAfterViewInit(): void {
    this.plans.subscribe(plans => {
      this.display(plans[0]) // initial stats
      setTimeout(() => { // fixes a ui bug
        this.display(plans[0])
      }, 800);
    })
  }

  display(plan: Plan) {
    this.planStatOptions.series = [{
      data: loadPlanDataForApexChartSeries(plan)
    }]
    this.planStatBrushOptions.series = [{
      data: loadPlanDataForApexChartSeries(plan)
    }]
    console.log(loadPlanDataForApexChartSeries(plan))
  }

  onSwiper(swiper) { }

  onSlideChange() { }

}
