import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  // use behavior subject, initializes with value
  private dataChangeSubject = new BehaviorSubject<boolean>(false);
  public dataChanged$ = this.dataChangeSubject.asObservable();

  private apiUrl = "http://localhost:8080/api/blogs"
  public blog: any = []

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<Object[]>(this.apiUrl);
  }

  async addBlog(blog: any) {
    const positionData = await this.getCurrentPosition()
    blog.coords = positionData

    this.http.post<[]>(this.apiUrl, blog).subscribe(blogs => {
      console.log(blogs)
      this.blog = blogs;
      this.dataChangeSubject.next(true);
    });
  }

  async editBlog(blog: any, id: any) {
    const positionData = await this.getCurrentPosition()
    blog.coords = positionData

    console.log(`${this.apiUrl}/${id}`)
    this.http.put<[]>(`${this.apiUrl}/${id}`, blog).subscribe(blogs => {
      this.blog = blogs;
      this.dataChangeSubject.next(true);
    });
  }

  deleteBlog(blog: any) {
    console.log(blog)
    this.http.delete<[]>(`${this.apiUrl}/${blog._id}`).subscribe(blogs => {
      console.log(blogs)
      this.blog = blogs;
      this.dataChangeSubject.next(true);
    });
  }

  async getCurrentPosition() {
    let positionData = {}
    try {
      const res = await Geolocation.getCurrentPosition();
      positionData = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      } 
    } finally {
        return positionData;
    }
  };

  async shareBlog(blog: any) {
    await Share.share({
      title: blog.title,
      text: blog.message
    });
  }
}
