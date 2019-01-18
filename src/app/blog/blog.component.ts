import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';
import { RelationshipService } from '../relationship.service';
import { Relationship } from '../relationship';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[];
  relationship: Relationship;

  private API_URL = environment.apiUrl;

  constructor(private blogService: BlogService, private relationshipService: RelationshipService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs()
    .subscribe(blogs => {
      this.blogs = this.getBlogsStructure(blogs);
    });
  }

  getBlogsStructure(blogs) {
    var data = [];
    for (var i = 0; i < blogs.data.length; i++) {
      let blog = new Blog();
      blog.id = <string>blogs.data[i].id;
      blog.nid = <number>blogs.data[i].attributes.drupal_internal__nid;
      blog.title = <string>blogs.data[i].attributes.title;
      blog.body =  <string>blogs.data[i].attributes.body.processed;
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

  getThumbnailUrl(field_thumbnail: string, blog: Blog): void {
    this.relationshipService.getThumbnailUrl(field_thumbnail)
    .subscribe(realtionship => {
      blog.thumbnail = this.API_URL + realtionship.data.attributes.uri.url;
    });
  }
}
