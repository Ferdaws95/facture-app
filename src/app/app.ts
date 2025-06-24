import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; // 👈 ajouter ceci
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            RouterLink,
            CommonModule,
            MatIconModule,
            MatSidenavModule,
            MatListModule,
            MatToolbarModule

          ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'facture-app';
      listMenu = routes;
}
