import { AuthStorageService } from 'src/services/auth-storage.service';
import { SimpleHttpService } from 'src/services/simple-http.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Plan } from 'src/models/plan';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNoData,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexYAxis,
} from "ng-apexcharts";
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from 'src/models/user';
import { calculateCurrentGross } from 'src/adjectives/functions';

export interface ChartOptions {
  chart: ApexChart,
  xaxis: ApexXAxis,
  yaxis: ApexYAxis | ApexYAxis[],
  title: ApexTitleSubtitle,
  dataLabels: ApexDataLabels,
  annotations: ApexAnnotations,
  series: ApexAxisChartSeries | ApexNonAxisChartSeries,
  stroke: ApexStroke,
  labels: string[],
  legend: ApexLegend,
  markers: ApexMarkers,
  noData: ApexNoData,
  fill: ApexFill,
  tooltip: ApexTooltip,
  plotOptions: ApexPlotOptions,
  responsive: ApexResponsive[],
  grid: ApexGrid,
  states: ApexStates,
  subtitle: ApexTitleSubtitle,
  theme: ApexTheme
}

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit, OnDestroy {
  @Input() plan: Plan;
  @Input() showStats?: boolean = false;
  icon: SafeHtml;
  user: BehaviorSubject<User>;

  private subscriptions: ReplaySubject<boolean> = new ReplaySubject(1);

  // public chartOptions: Partial<ChartOptions>;
  public chartOptions: Partial<any>;

  constructor(private post: SimpleHttpService, public authStore: AuthStorageService,
    private sanitizer: DomSanitizer) {
    this.user = authStore.currentUser;
  }

  ngOnInit(): void {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(`
        <svg class="svg-icon">
          <use xlink:href="#${this.plan.icon}"></use>
        </svg>
    `);

    this.chartOptions = {
      series: [{
        data: this.plan?.DailyInterests.map(d => {
          return { x: d['createdAt'], y: d['gross'] }
        })
      }],
      xaxis: {
        type: 'datetime'
      },
      chart: {
        type: 'area',
        height: '150px',
        foreColor: '#ffffff',
        toolbar: {
          show: false
        }
      },
      colors: ['#ffffff'],
      stroke: { curve: 'smooth', width: 3 },
      grid: {
        borderColor: '#ababab',
        clipMarkers: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 10,
          left: 0
        }
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0
        }
      },
      tooltip: {
        enabled: false
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.next(true);
    this.subscriptions.complete();
  }

  get userCurrency() {
    return this.user.getValue().currency;
  }

  get currentGross() {
    return calculateCurrentGross(this.plan);
  }

}
