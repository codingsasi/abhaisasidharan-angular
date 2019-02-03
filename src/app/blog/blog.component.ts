import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';
import { RelationshipService } from '../relationship.service';
import { Relationship } from '../relationship';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: Blog[];
  relationship: Relationship;
  public id: string = null;
  private sub: any;
  private API_URL = environment.apiUrl;

  constructor(private blogService: BlogService,
              private relationshipService: RelationshipService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
      }
      this.getBlogs(this.id);
    });
  }

  getBlogs(id: string): void {
    this.blogService.getBlogs(id)
    .subscribe(blogs => {
      this.blogs = this.getBlogsStructure(blogs, id);
    });
  }

  getBlogsStructure(blogs, id) {
    var data: Blog[] = [];
    if (id) {
      let blog = new Blog();
      blog.id = <string>blogs.data.id;
      blog.nid = <number>blogs.data.attributes.drupal_internal__nid;
      blog.title = <string>blogs.data.attributes.title;
      blog.body =  <string>blogs.data.attributes.body.processed;
      blog.summary = <string>blogs.data.attributes.body.summary;
      blog.alias = <string>blogs.data.attributes.path.alias;
      blog.created = <string>blogs.data.attributes.created;
      blog.changed = <string>blogs.data.attributes.changed;
      this.getThumbnailUrl(blogs.data.relationships.field_thumbnail.links.related.href, blog);
      blog.images = ['na'];
      data.push(blog);
    }
    else {
      for (var i = 0; i < blogs.data.length; i++) {
        let blog = new Blog();
        blog.id = <string>blogs.data[i].id;
        blog.nid = <number>blogs.data[i].attributes.drupal_internal__nid;
        blog.title = <string>blogs.data[i].attributes.title;
        blog.summary = <string>blogs.data[i].attributes.body.summary;
        blog.alias = <string>blogs.data[i].attributes.path.alias;
        blog.created = <string>blogs.data[i].attributes.created;
        blog.changed = <string>blogs.data[i].attributes.changed;
        this.getThumbnailUrl(blogs.data[i].relationships.field_thumbnail.links.related.href, blog);
        blog.images = ['na'];
        data.push(blog);
      }
    }
    return data;
  }

  getThumbnailUrl(field_thumbnail: string, blog: Blog): void {
    this.relationshipService.getThumbnailUrl(field_thumbnail)
    .subscribe(realtionship => {
      blog.thumbnail = this.API_URL + realtionship.data.attributes.uri.url;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
