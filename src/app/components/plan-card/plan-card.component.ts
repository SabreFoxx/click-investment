import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Plan } from 'src/models/plan';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {
  @Input() plan: Plan;
  icon: SafeHtml;

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 100], label: 'Series A' },
  ];

  public lineChartLabels: Label[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'
  ];

  public lineChartOptions = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "blue",
          font: {
            size: 10
          }
        }
      }
    },

    scales: {
      xAxes: [{
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        gridLines: {
          drawBorder: false,
        },
        display: false
      }]
    }
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderColor: 'rgba(255,255,255,0.8)',
      pointBackgroundColor: '#fff',
      pointBorderColor: 'rgba(148,159,177,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.icon = this.sanitizer.bypassSecurityTrustHtml(`
        <svg class="svg-icon">
          <use xlink:href="#${this.plan.icon}"></use>
        </svg>
    `);
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
