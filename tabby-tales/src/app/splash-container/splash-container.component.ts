import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-splash-container',
  templateUrl: './splash-container.component.html',
  styleUrls: ['./splash-container.component.scss'],
  standalone: true,
})
export class SplashContainerComponent {
  @Input() title?: string;
}
