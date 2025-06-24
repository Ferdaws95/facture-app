import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // 👈 ajouter ceci
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            RouterLink,
            CommonModule,
            MatIconModule,
            MatSidenavModule,
            MatListModule,
            MatToolbarModule,
            MatButtonModule,
            MatTableModule ,
            MatFormFieldModule,
            MatInputModule

          ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'facture-app';
      listMenu = routes;
}
