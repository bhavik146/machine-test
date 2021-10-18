import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  newUser: any;
  isSubmitDisabled: boolean = true;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required]
    })


  }

  onSubmit() {

    this.newUser = this.userForm.value;
    console.log(this.newUser);

    this.dialogRef.close(this.newUser)

  }

}
