import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from './category.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

  private url = environment.database_url;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "categories.json")
      .pipe(
        map(data => {
          const categories: Category[] = [];

          for (const key in data) {
            categories.push({ ...data[key], id: key });
          }

          return categories;
        })
      );
  }

  createCategory(Category: Category): Observable<Category> {
    return this.http.post<Category>(this.url + "categories.json", Category);
  }
}
