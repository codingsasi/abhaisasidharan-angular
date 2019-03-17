import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './blog/blog.component';
import { ResumeComponent } from './resume/resume.component';
import { HumourComponent } from './humour/humour.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NoSanitizePipe } from './no-sanitize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ResumeComponent,
    HumourComponent,
    PortfolioComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
