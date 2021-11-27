import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swiper, { SwiperOptions, EffectCoverflow, Pagination } from 'swiper';

Swiper.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatComponent implements OnInit {
  plans: Observable<Plan[]>;

  config: SwiperOptions = {
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'));
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

}
