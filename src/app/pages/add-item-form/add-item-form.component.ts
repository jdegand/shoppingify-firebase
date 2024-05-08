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

    this.categoryFirebaseService.getCategories().subscribe((data: DocumentData)=> {
      this.categories = data as CategoriesResponse[];
    })
    // get the categories with API request and use that here
    // necessary to have category id ?

    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      note: [""],
      url: [""],
      category: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup);

    if(this.formGroup.valid){
      this.itemFirebaseService.addItem(this.formGroup.value);
    }

  }

}
