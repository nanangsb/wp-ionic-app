import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TranslateModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage
			}
		]),
		ComponentsModule
	],
	declarations: [HomePage]
})
export class HomePageModule { }