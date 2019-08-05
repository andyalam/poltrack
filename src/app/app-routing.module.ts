import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from '@app/settings';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'tools',
    loadChildren: () =>
      import('app/examples/examples.module').then(m => m.ExamplesModule)
  },
  { path: '', redirectTo: '/reportcard', pathMatch: 'full' },
  { path: '**', redirectTo: '/reportcard' }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
