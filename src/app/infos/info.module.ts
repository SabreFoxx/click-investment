import { FaqContentService } from './../../services/faq-content.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { Routes } from '@angular/router';

export const infoRoutes: Routes = [
  {
    path: 'faq',
    component: FaqComponent,
    resolve: {
      faqs: FaqContentService
    }
  }
]

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InfoModule { }
