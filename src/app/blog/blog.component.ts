import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Blog, BlogTeaser } from './blog';
import { BlogService } from './blog.service';
import { RelationshipService } from '../relationship.service';
import { Relationship } from '../relationship';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: BlogTeaser[];
  blog: Blog;
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
        this.getBlog(params['id']);
      }
      else {
        this.getBlogs();
      }
    });
  }

  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => {
      this.blogs = this.getBlogsStructure(blogs);
    });
  }

  getBlog(id: string): void {
    this.blogService.getBlog(id)
    .subscribe(blog => {
      this.blog = this.getBlogStructure(blog);
    });
  }

  getBlogsStructure(blogs) {
    var data = [];
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
    return data;
  }

  getBlogStructure(blog) {
    var blog_object = new Blog();
    blog_object.id = <string>blog.data.id;
    blog_object.nid = <number>blog.data.attributes.drupal_internal__nid;
    blog_object.title = <string>blog.data.attributes.title;
    blog_object.body =  <string>blog.data.attributes.body.processed;
    blog_object.summary = <string>blog.data.attributes.body.summary;
    blog_object.alias = <string>blog.data.attributes.path.alias;
    blog_object.created = <string>blog.data.attributes.created;
    blog_object.changed = <string>blog.data.attributes.changed;
    this.getThumbnailUrl(blog.data.relationships.field_thumbnail.links.related.href, blog_object);
    blog_object.images = ['na'];
    return blog_object;
  }

  getThumbnailUrl(field_thumbnail: string, blog): void {
    this.relationshipService.getThumbnailUrl(field_thumbnail)
    .subscribe(realtionship => {
      blog.thumbnail = this.API_URL + realtionship.data.attributes.uri.url;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
