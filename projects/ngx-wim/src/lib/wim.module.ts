import { NgModule } from '@angular/core';

import { WimDirective } from './wim.directive';
import { WimService } from './wim.service';

@NgModule({
  declarations: [WimDirective],
  imports: [],
  exports: [WimDirective],
  providers: [WimService],
})
export class WimModule {}
