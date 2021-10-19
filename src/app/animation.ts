import {
    trigger,
    transition,
    style,
    query,
    animateChild,
    animate,
    group
} from "@angular/animations";

export const fadeAnimation =
    trigger('fadeAnim', [
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                })
            ], { optional: true }),

            query(':enter', [
                style({ opacity: 0 })
            ], { optional: true }),

            query(':leave', animateChild(), { optional: true }),

            query(':leave', [
                style({ opacity: 1 }),
                animate('150ms', style({ opacity: 0 }))
            ], { optional: true }),

            query(':enter', [
                style({ opacity: 0 }),
                animate('150ms', style({ opacity: 1 }))
            ], { optional: true }),

            query(':enter', animateChild(), { optional: true }),
        ])
    ]);