import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SplashContainerComponent } from '../splash-container/splash-container.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, SplashContainerComponent],
})
export class HomePage {
  
  title = "Tabby Tails"

  constructor() {}
}
