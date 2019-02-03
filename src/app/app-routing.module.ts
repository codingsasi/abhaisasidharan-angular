import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ResumeComponent } from './resume/resume.component';
import { HumourComponent } from './humour/humour.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './core/contact/contact.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogComponent},  
  { path: 'resume', component: ResumeComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'humour', component: HumourComponent },
  { path: 'my-works-question-mark', component: PortfolioComponent },
  { path: 'my-works-question-mark/:id', component: PortfolioComponent },
  { path: '**', redirectTo: '/blog' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
