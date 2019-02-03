import { Component, OnInit } from '@angular/core';
import { Portfolio } from './portfolio';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from './portfolio.service';
import { RelationshipService } from '../relationship.service';
import { environment } from '../../environments/environment';
import { Relationship } from '../relationship';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[];
  relationship: Relationship;
  public id: string = null;
  private sub: any;
  private API_URL = environment.apiUrl;

  constructor(private portfolioService: PortfolioService,
    private relationshipService: RelationshipService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
      this.getPortfolios(this.id);
    });
  }

  getPortfolios(id: string): void {
    this.portfolioService.getPortfolios(id)
    .subscribe(portfolios => {
      this.portfolios = this.getPortfoliosStructure(portfolios, id);
    });
  }

  getPortfoliosStructure(portfolios, id) {
    var data: Portfolio[] = [];
    if (id) {
      let portfolio = new Portfolio();
      portfolio.id = <string>portfolios.data.id;
      portfolio.nid = <number>portfolios.data.attributes.drupal_internal__nid;
      portfolio.title = <string>portfolios.data.attributes.title;
      portfolio.body = <string>portfolios.data.attributes.body.processed;
      portfolio.alias = <string>portfolios.data.attributes.path.alias;
      portfolio.live_link = <string>portfolios.data.attributes.field_portfolio_link;
      this.getThumbnailUrl(portfolios.data.relationships.field_thumbnail.links.related.href, portfolio);
      this.getImages(portfolios.data.relationships.field_image.links.related.href, portfolio);
      data.push(portfolio);
    }
    else {
      for (var i = 0; i < portfolios.data.length; i++) {
        let portfolio = new Portfolio();
        portfolio.id = <string>portfolios.data[i].id;
        portfolio.nid = <number>portfolios.data[i].attributes.drupal_internal__nid;
        portfolio.title = <string>portfolios.data[i].attributes.title;
        portfolio.body = <string>portfolios.data[i].attributes.body.processed;
        portfolio.alias = <string>portfolios.data[i].attributes.path.alias;
        this.getThumbnailUrl(portfolios.data[i].relationships.field_thumbnail.links.related.href, portfolio);
        portfolio.images = ['na'];      
        data.push(portfolio);
      }
    }
    return data;
  }

  getThumbnailUrl(field_thumbnail: string, portfolio): void {
    this.relationshipService.getThumbnailUrl(field_thumbnail)
    .subscribe(relationship => {
      portfolio.thumbnail = this.API_URL + relationship.data.attributes.uri.url;
    });
  }

  getImages(field_image: string, portfolio): void {
    this.relationshipService.getImageUrls(field_image)
    .subscribe(relationship => {
      portfolio.images = this.getImageUrls(relationship);
    });
  }

  getImageUrls (relationship) {
    var images = [];
    relationship.data.forEach(image => {
      images.push(this.API_URL + image.attributes.uri.url);
    });
    return images;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
