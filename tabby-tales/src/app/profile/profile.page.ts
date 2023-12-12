import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonGrid, IonList, IonItem, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonGrid, IonList, IonItem, IonText ],
})
export class ProfilePage {
  title = "Profile"
  constructor() {}
}
