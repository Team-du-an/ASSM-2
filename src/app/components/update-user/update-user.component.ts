import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private service: AuthService,
        private toastr: ToastrService,
        private dialogref: MatDialogRef<UpdateUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.service.getAllRole().subscribe((res) => {
            this.roleList = res;
        });
    }

    editData: any;
    roleList: any;

    ngOnInit(): void {
        this.service.getAllRole().subscribe((res) => {
            this.roleList = res;
        });

        if (this.data.usercode != null && this.data.usercode != '') {
            this.service.getById(this.data.usercode).subscribe((res) => {
                this.editData = res;
                this.loaduserdata(this.data.usercode);
            });
        }
    }

    registerform = this.formBuilder.group({
        id: this.formBuilder.control(''),
        username: this.formBuilder.control(''),
        password: this.formBuilder.control(''),
        email: this.formBuilder.control(''),
        gender: this.formBuilder.control('male'),
        role: this.formBuilder.control('', Validators.required),
        isActive: this.formBuilder.control(false),
    });

    loaduserdata(code: any) {
        this.service.getById(code).subscribe((res) => {
            this.editData = res;
            this.registerform.setValue({
                id: this.editData.id,
                username: this.editData.username,
                password: this.editData.password,
                email: this.editData.email,
                gender: this.editData.gender,
                role: this.editData.role,
                isActive: this.editData.isActive,
            });
        });
    }

    handleUpdate() {
        this.service.updateUser(this.registerform.value.id, this.registerform.value).subscribe((res) => {
            this.toastr.success('Updated successfully.');
            this.dialogref.close();
        });
    }
}
