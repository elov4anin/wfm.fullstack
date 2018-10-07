import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {MaterialService} from '../../shared/classes/material.service';
import {Category} from '../../shared/interfaces/category.interface';
import {error} from 'util';

@Component({
  selector: 'app-categories-form-page',
  templateUrl: './categories-form-page.component.html',
  styleUrls: ['./categories-form-page.component.css']
})
export class CategoriesFormPageComponent implements OnInit {
  @ViewChild('upload') uploadRef: ElementRef;
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview = '';
  category: Category;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

   this.route.params.pipe(
     switchMap((params) => {
       if (params['id']) {
         this.form.disable();
         this.isNew = false;
         return this.categoriesService.getById(params['id']);
       }
       return of(null);
     })
   ).subscribe(
     cat => {
       if (cat) {
         this.category = cat;
         this.form.patchValue({
           name: cat.name
         });
         this.imagePreview = cat.imageSrc;
         MaterialService.updateTextInputs();
         this.form.enable();
     }},
     error1 => MaterialService.toast(error1.error.message)
   );
  }

  onSubmit() {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      category => {
        this.category = category;
        this.form.enable();
        MaterialService.toast('Изменения сохранены');

      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );

  }

  triggerClick() {
    this.uploadRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию ${this.category.name}`);
    if (decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          (res) => {
            MaterialService.toast(res.message);
          },
          error1 => {
            MaterialService.toast(error1.error.message);
          },
          () => this.router.navigate(['/categories'])
        );
    }

  }
}
