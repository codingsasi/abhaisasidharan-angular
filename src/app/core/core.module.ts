import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [HeaderComponent, FooterComponent, ContactComponent, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, ContactComponent, SidebarComponent]
})
export class CoreModule { }
