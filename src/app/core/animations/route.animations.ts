import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence,
  AnimationTriggerMetadata,
  AnimationMetadata
} from '@angular/animations';
import { AnimationsService } from './animations.service';

export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';

const STEPS_ALL: AnimationMetadata[] = [
  query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
    optional: true
  }),
  query(':enter .' + ROUTE_ANIMATIONS_ELEMENTS, style({ opacity: 0 }), {
    optional: true
  }),
  sequence([
    query(
      ':leave > *',
      [
        style({ transform: 'translateY(0%)', opacity: 1 }),
        animate(
          '0.2s ease-in-out',
          style({ transform: 'translateY(-3%)', opacity: 0 })
        ),
        style({ position: 'fixed' })
      ],
      { optional: true }
    ),
    query(
      ':enter > *',
      [
        style({
          transform: 'translateY(-3%)',
          opacity: 0,
          position: 'static'
        }),
        animate(
          '0.5s ease-in-out',
          style({ transform: 'translateY(0%)', opacity: 1 })
        )
      ],
      { optional: true }
    )
  ]),
  query(
    ':enter .' + ROUTE_ANIMATIONS_ELEMENTS,
    stagger(100, [
      style({ transform: 'translateY(15%)', opacity: 0 }),
      animate(
        '0.5s ease-in-out',
        style({ transform: 'translateY(0%)', opacity: 1 })
      )
    ]),
    { optional: true }
  )
];
const STEPS_NONE = [];
const STEPS_PAGE = [STEPS_ALL[0], STEPS_ALL[2]];
const STEPS_ELEMENTS = [STEPS_ALL[1], STEPS_ALL[3]];

export const routeAnimations: AnimationTriggerMetadata = trigger(
  'routeAnimations',
  [
    transition(isRouteAnimationsAll, STEPS_ALL),
    transition(isRouteAnimationsNone, STEPS_NONE),
    transition(isRouteAnimationsPage, STEPS_PAGE),
    transition(isRouteAnimationsElements, STEPS_ELEMENTS)
  ]
);

export function isRouteAnimationsAll(): boolean {
  return AnimationsService.isRouteAnimationsType('ALL');
}

export function isRouteAnimationsNone(): boolean {
  return AnimationsService.isRouteAnimationsType('NONE');
}

export function isRouteAnimationsPage(): boolean {
  return AnimationsService.isRouteAnimationsType('PAGE');
}

export function isRouteAnimationsElements(): boolean {
  return AnimationsService.isRouteAnimationsType('ELEMENTS');
}
