import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogComponent},  
  { path: 'resume', component: ResumeComponent},
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
