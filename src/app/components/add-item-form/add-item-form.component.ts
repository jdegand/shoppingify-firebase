import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css'
})
export class AddItemFormComponent implements OnInit {

  fb = inject(FormBuilder);

  categories: any | undefined;

  formGroup!: FormGroup;

  ngOnInit() {

    // get the categories with API request and use that here
    // necessary to have category id ?

    this.categories = [
      { name: 'Frozen Foods', code: 'NY' },
      { name: 'Diary', code: 'RM' },
      { name: 'Beverages', code: 'LDN' },
      { name: 'Fruits', code: 'IST' },
    ];

    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      note: [""],
      url: [""],
      category: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }

}
