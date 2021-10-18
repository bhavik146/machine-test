import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from "../../model/user";
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DatePipe } from '@angular/common';
import { DeleteUserComponent } from '../delete-user/delete-user.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'gender', 'address', 'dob', 'edit'];
  dataSource = new MatTableDataSource<User>(USER_DATA);
  value = 0;;
  totalMaleUsers = 0;
  totalFemaleUsers = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentUser: any;
  newUser: any;
  newDate: any;
  deleteUserOption: boolean;

  constructor(public dialog: MatDialog, public datePipe: DatePipe, private changeDetectorRefs: ChangeDetectorRef) {
    console.log('dialog', this.dialog);

  }

  ngOnInit(): void {

    console.log(this.dataSource)
    this.getUserCount()


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUserCount() {
    let maleUser = 0;
    let femaleUser = 0;
    this.dataSource.filteredData.forEach((user) => {
      if (user.gender === "Male") {
        this.totalMaleUsers++;
      }
      else if (user.gender === "Female") {
        this.totalFemaleUsers++;
      }
    })
    this.value = this.totalMaleUsers * 10;
    console.log('totalMaleUsers', this.totalMaleUsers);
    console.log('totalFemaleUsers', this.totalFemaleUsers);
  }

  clearCount() {
    this.totalMaleUsers = 0;
    this.totalFemaleUsers = 0;
  }


  editUser(i: number): void {
    console.log(this.dataSource.filteredData[i]);
    this.currentUser = this.dataSource.filteredData[i];

    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '35%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed.EditUserComp is: ', result);
        this.newUser = result;
        this.newDate = this.datePipe.transform(result.dob, "dd/mm/yyyy");
        this.dataSource.filteredData[i].name = result.name;
        this.dataSource.filteredData[i].email = result.email;
        this.dataSource.filteredData[i].gender = result.gender;
        this.dataSource.filteredData[i].dob = this.newDate;
        this.dataSource.filteredData[i].address = result.address;

        this.clearCount();
        this.getUserCount()
      }
      console.log(this.dataSource.filteredData);

    });
  }

  deleteUser(i: number) {
    let user = this.dataSource.filteredData[i]
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '35%',
      data: { username: user.name }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      console.log('result', result);
      this.deleteUserOption = result.deleteUserOption;
      console.log('deleteUserOption', this.deleteUserOption);

      if (this.deleteUserOption === true) {
        this.dataSource.filteredData.splice(i, 1)
        this.changeDetectorRefs.detectChanges()
        console.log('new dataSource', this.dataSource.filteredData);
        this.dataSource = new MatTableDataSource<User>(this.dataSource.filteredData);
        this.dataSource.paginator = this.paginator;
        this.clearCount()
        this.getUserCount()
      }

    });
  }

}

const USER_DATA: User[] = [
  { name: 'Bravo', email: 'bravo@gmail.com', gender: 'Female', address: 'Pune', dob: '01/04/1990' },
  { name: 'Abhishek', email: 'abhi@gmail.com', gender: 'Male', address: 'Nagpur', dob: '12/10/1889' },
  { name: 'Dev', email: 'dev@gmail.com', gender: 'Male', address: 'Pune', dob: '13/02/1975' },
  { name: 'Belgi', email: 'belgi@gmail.com', gender: 'Feamle', address: 'Pune', dob: '04/07/1991' },
  { name: 'Joe', email: 'joe@gmail.com', gender: 'Male', address: 'Delhi', dob: '01/09/1989' },
  { name: 'Dany', email: 'dany@gmail.com', gender: 'Female', address: 'Mumbai', dob: '23/12/1987' },
  { name: 'Saga', email: 'saga@gmail.com', gender: 'Male', address: 'Mumbai', dob: '03/02/1996' },
  { name: 'Amy', email: 'amy@gmail.com', gender: 'Female', address: 'Delhi', dob: '11/10/1978' },
  { name: 'John', email: 'john@gmail.com', gender: 'Male', address: 'Nashik', dob: '09/08/1996' },
  { name: 'Bhavik', email: 'bhavik@gmail.com', gender: 'Male', address: 'Manyi', dob: '20/12/1987' },
  { name: 'Nano', email: 'nano@gmail.com', gender: 'Male', address: 'Pune', dob: '13/02/1977' },
  { name: 'Pranay', email: 'pranay@gmail.com', gender: 'Male', address: 'Pune', dob: '01/09/1981' },
  { name: 'Rony', email: 'rony@gmail.com', gender: 'Female', address: 'Nas', dob: '11/09/1989' },
  { name: 'Mary', email: 'mary@gmail.com', gender: 'Female', address: 'Gondia', dob: '23/12/1987' }

]