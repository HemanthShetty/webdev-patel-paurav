import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  pages = [{}];
  page = {};
  pageName: String;
  pageDesc: String;

  constructor(private pageService: PageService,
              private activatedRoutes: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.pageService.findPagesByWebsiteId(this.websiteId)
        .subscribe((data) => {
          if (data) {
            this.pages = data;
          }
        });
      this.pageService.findPageById(this.pageId)
        .subscribe((data) => {
          if (data) {
            this.page = data;
            this.pageName = this.page['name'];
            this.pageDesc = this.page['description'];
          }
        });
    });
  }

  editPage() {
    this.page['name'] = this.pageName;
    this.page['description'] = this.pageDesc;
    this.pageService.updatePage(this.pageId, this.page)
      .subscribe((data) => {
        if (data) {
          this.page = data;
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        }
      });
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)
      .subscribe((data) => {
        if (data === 200) {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        }
      });
  }
}
