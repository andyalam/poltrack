import { Injectable } from '@angular/core';

@Injectable()
export class AnimationsService {
  constructor() {
    AnimationsService.routeAnimationType = 'NONE';
  }

  private static routeAnimationType: RouteAnimationType = 'NONE';

  static isRouteAnimationsType(type: RouteAnimationType): boolean {
    return AnimationsService.routeAnimationType === type;
  }

  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean
  ): void {
    AnimationsService.routeAnimationType =
      pageAnimations && elementsAnimations
        ? 'ALL'
        : pageAnimations
        ? 'PAGE'
        : elementsAnimations
        ? 'ELEMENTS'
        : 'NONE';
  }
}

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';
