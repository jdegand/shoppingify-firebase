import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, DialogModule, InputTextModule, CardModule, ImageModule, FloatLabelModule],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.css'
})
export class AddItemDialogComponent {

  fb = inject(FormBuilder);

  categories: any | undefined;

  formGroup!: FormGroup;

  visible = false;
  loading = false;

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

  showDialog() {
    this.visible = true;
  }

}
