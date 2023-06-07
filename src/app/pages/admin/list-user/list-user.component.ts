import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IAuth } from 'src/interfaces/Auth';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from 'src/app/components/update-user/update-user.component';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
    constructor(private service: AuthService, private dialog: MatDialog) {
        this.loadUser();
    }

    userList: any;
    dataSource: any;

    displayedColumns: string[] = ['id', 'username', 'email', 'role', 'status', 'action'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loadUser() {
        this.service.getAll().subscribe((res) => {
            this.userList = res;
            this.dataSource = new MatTableDataSource(this.userList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    updateUser(code: any) {
        this.OpenDialog('300ms', '300ms', code);
    }

    OpenDialog(enteranimation: any, exitanimation: any, code: string) {
        const popup = this.dialog.open(UpdateUserComponent, {
            enterAnimationDuration: enteranimation,
            exitAnimationDuration: exitanimation,
            width: '30%',
            data: {
                usercode: code,
            },
        });
        popup.afterClosed().subscribe((res) => {
            this.loadUser();
        });
    }
}
