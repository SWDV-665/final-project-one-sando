import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BlogServiceService } from './blog-service.service';

@Injectable({
  providedIn: 'root'
})
export class PromptServiceService {


  constructor(private alertController: AlertController, private blogService: BlogServiceService) { }
  
  async promptAlert(blog?: any, id?: any) {
    const alert = await this.alertController.create({
      header: blog ? 'Edit Blog..': 'Add Blog..',
      inputs: [
        {
          placeholder: 'Title',
          name: 'title',
          value: blog ? blog.title: null
        },
        {
          placeholder: 'Message',
          name: 'message',
          value: blog ? blog.message: null,
          type: 'textarea',
        },
      ],
      buttons: [
        {
          'text': 'Cancel',
          'role': 'cancel',
        },
        {
          'text': 'Save',
          'handler': (blog: any) => {
            if (id !== undefined) {
              this.blogService.editBlog(blog, id)
            } else {
              this.blogService.addBlog(blog)
            }
          }
        }
      ]
    });
    await alert.present();
    /*
    // Another way to do this:
    const result = await alert.onDidDismiss();
    const data = result.data.values;
    console.log(data)
    if (id !== undefined) {
      this.blogService.editBlog(data, id)
    } else {
      this.blogService.addBlog(data)
    }
    */
  }
}