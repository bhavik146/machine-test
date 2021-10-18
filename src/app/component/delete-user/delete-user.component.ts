import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from "../../model/dialogdata";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  username: string;
  deleteUserOption: boolean = false;
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    console.log('Dailogdata', this.data);
    this.username = this.data.username
  }

  onNoClick() {
    this.dialogRef.close({ 'deleteUserOption': this.deleteUserOption })
  }

  onYesClick() {
    this.deleteUserOption = true;
    this.dialogRef.close({ 'deleteUserOption': this.deleteUserOption })
  }

}
