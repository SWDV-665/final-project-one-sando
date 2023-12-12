import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonList, IonIcon, IonCardTitle, IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonItem, IonButton, IonAlert } from '@ionic/angular/standalone';
import { BlogServiceService } from '../blog-service.service';
import { PromptServiceService } from '../prompt-service.service';
import { shareOutline, createOutline, trash, add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-blog',
  templateUrl: 'blog.page.html',
  styleUrls: ['blog.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonList, IonIcon, IonCardTitle, IonCardSubtitle, IonCard, IonCardHeader, IonCardContent, IonItem, IonButton, IonAlert ]
})
export class BlogPage {

  title = "Blog"

  blogs: any = []

  constructor(private blogService: BlogServiceService, private promptService: PromptServiceService) {
    addIcons({ trash, add, createOutline, shareOutline });

    blogService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadBlogs();
    })
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (blogs: Object[]) => {
        // newest blogs first
        const reverseBlogs = blogs.reverse();

        this.blogs = reverseBlogs;
      }
    );
  }

  removeBlog(blog: any) {
    console.log('Removing ', blog)
    this.blogService.deleteBlog(blog)
  }

  editBlog(blog: any) {
    console.log('Editing ', blog._id)
    this.promptService.promptAlert(blog, blog._id)
  }

  addBlog() {
    console.log('Adding Item')
    this.promptService.promptAlert()
  }

  shareBlog(blog: any) {
    this.blogService.shareBlog(blog)
  }
}
