import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { CategoryFirebaseService } from '../../services/category/category-firebase.service';
import { CategoriesResponse } from '../../interfaces/categories-response.interface';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css'
})
export class AddItemFormComponent implements OnInit {
  fb = inject(FormBuilder);
  itemFirebaseService = inject(ItemFirebaseService);
  categoryFirebaseService = inject(CategoryFirebaseService);

  categories: CategoriesResponse[] = [];

  formGroup!: FormGroup;

  ngOnInit() {

    this.categoryFirebaseService.getCategories().subscribe((data: DocumentData) => {
      this.categories = data as CategoriesResponse[];
      // causes problem with category being a nested object
      // worked around it by changing the object sent to firebase
    })

    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      note: [""],
      url: [""], // need a regex to make sure it's a url
      category: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup);

    if (this.formGroup.valid) {

      /*
      // passing formData causes an error when you pass the data to firebase 

      const formData = new FormData();
      formData.append("name", this.formGroup.get("name")?.value);
      formData.append("note", this.formGroup.get("note")?.value);
      formData.append("url", this.formGroup.get("url")?.value);
      formData.append("categoryName", this.formGroup.get("category")?.value?.name);
      formData.append("categoryId", this.formGroup.get("category")?.value?.id);
      */

      // `const` just means the object can't be renamed
      const formObject = {
        name: "",
        note: "",
        url: "",
        categoryName: "",
        categoryId: ""
      };

      formObject.name = this.formGroup.get("name")?.value;
      formObject.note = this.formGroup.get("note")?.value;
      formObject.url = this.formGroup.get("url")?.value;
      formObject.categoryName = this.formGroup.get("category")?.value?.name;
      formObject.categoryId = this.formGroup.get("category")?.value?.id;

      this.itemFirebaseService.addItem(formObject);

    }

  }

}
