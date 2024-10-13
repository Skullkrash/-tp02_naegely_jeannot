import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserFormularyComponent } from './user-formulary/user-formulary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, UserFormularyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'tp02_naegely_jeannot';
}
