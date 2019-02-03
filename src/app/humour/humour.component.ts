import { Component, OnInit } from '@angular/core';
import { Faq } from './faq';
import { ActivatedRoute, Router } from '@angular/router';
import { HumourService } from './humour.service';

@Component({
  selector: 'app-humour',
  templateUrl: './humour.component.html',
  styleUrls: ['./humour.component.scss']
})
export class HumourComponent implements OnInit {
  faqs: Faq[];

  constructor(private humourService: HumourService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs(): void {
    this.humourService.getFaqs()
    .subscribe(faqs => {
      this.faqs = this.getFaqStructure(faqs);
    });
  }

  getFaqStructure (faqs) {
    var data = [];
    for (var i = 0; i < faqs.data.length; i++) {
      let faq = new Faq();
      faq.id = <string>faqs.data[i].id;
      faq.nid = <number>faqs.data[i].attributes.drupal_internal__nid;
      faq.title = <string>faqs.data[i].attributes.title;
      faq.body = <string>faqs.data[i].attributes.body.processed;
      data.push(faq);
    }
    return data;
  }

}
