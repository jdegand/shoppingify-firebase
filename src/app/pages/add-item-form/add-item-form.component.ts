import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ItemFirebaseService } from '../../services/item/item-firebase.service';
import { CategoryFirebaseService } from '../../services/category/category-firebase.service';
import { CategoriesResponse } from '../../interfaces/categories-response.interface';
import { DocumentData } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css'
})
export class AddItemFormComponent implements OnInit {
  fb = inject(FormBuilder);
  itemFirebaseService = inject(ItemFirebaseService);
  categoryFirebaseService = inject(CategoryFirebaseService);
  messageService = inject(MessageService);

  categories: CategoriesResponse[] = [];

  formGroup!: FormGroup;
  isLoading = false;

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
    if (this.formGroup.valid) {

      this.isLoading = true;

      // `const` just means the object can't be renamed
      // id will be created by firebase
      const formObject = {
        name: "",
        note: "",
        url: "",
        categoryName: "",
        categoryId: "",
        quantity: 0
      };

      formObject.name = this.formGroup.get("name")?.value;
      formObject.note = this.formGroup.get("note")?.value;
      formObject.url = this.formGroup.get("url")?.value;
      formObject.categoryName = this.formGroup.get("category")?.value?.name;
      formObject.categoryId = this.formGroup.get("category")?.value?.id;

      this.itemFirebaseService.addItem(formObject).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: formObject.name + " saved" });
          this.formGroup.reset();
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        },
        complete: () => this.isLoading = false
      });

    }

  }

}
