import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Resume } from './resume';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent implements OnInit {
  resume: Resume;

  constructor(private resumeService: ResumeService) { }

  ngOnInit() {
    this.getResume();
  }

  getResume(): void {
    this.resumeService.getResume()
    .subscribe(resume => {
      this.resume = resume['#markup'];
    });
  }

}
