import { Component, Input } from '@angular/core';

@Component({
  selector: 'event-log',
  template: `
        <div class="example-config">
            <h5>{{ title }}</h5>
            <ul class="event-log">
                <li *ngFor="let event of events">{{ logEvents(event) }}</li>
            </ul>
        </div>
    `,
  styles: [
    `
            .event-log {
                max-height: 208px;
            }
        `,
  ],
})
export class EventLogComponent {
  @Input() title!: string;
  @Input() events!: string[];

  public logEvents(event: string): string {
    return `${event}`;
  }
}
