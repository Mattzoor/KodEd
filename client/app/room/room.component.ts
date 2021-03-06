import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, Classroom, Snippet } from '../_models/index';
import { AlertService, UserService, ClassroomService, SnippetService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'room.component.html'
})

export class RoomComponent implements OnInit {
    model: any = {};
    currentUser: User;
    currentRoom: Classroom;
    loading = false;
    pendingReq: User[];
    students: User[];
    snippets: Snippet[];

    constructor(
        private router: Router,
        private classroomService: ClassroomService,
        private snippetService: SnippetService,
        private userService:UserService,
        private alertService: AlertService) { 
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
            this.pendingReq = new Array();
            this.students = new Array();
    }

    ngOnInit(){
        if(this.currentUser.teacher && this.currentRoom.pendingReq != null){
            this.reloadFields();
        }
    }

    reloadFields(){
        this.getPendingReq();
        this.getStudents();
        this.getSnippets();
    }

    getUserToReq(){
        this.pendingReq = new Array();
        this.currentRoom.pendingReq.forEach(user => {
            this.userService.getById(user).subscribe(
                (user:User) => { 
                    this.pendingReq.push(user); 
                }
            ); 
        });
    }

    getUserToStud(){
        this.students = new Array();
        this.currentRoom.students.forEach(user => {
            this.userService.getById(user).subscribe(
                (user:User) => { 
                    this.students.push(user); 
                }
            ); 
        });
    }

    getPendingReq(){
        this.classroomService.getPendingReq(this.currentRoom._id).subscribe(
            data => {   this.currentRoom.pendingReq = data;
                        this.getUserToReq();    
                }
        );
    }

    getStudents(){
        this.classroomService.getStudents(this.currentRoom._id).subscribe(
            data => {   this.currentRoom.students = data;
                        this.getUserToStud();    
                }
        );
    }

    acceptPendingReq(student:User){
        this.classroomService.acceptPendingReq(student, this.currentRoom).subscribe(
            data => {
                this.userService.updateRooms(student,this.currentRoom).subscribe(()=>{
                    this.reloadFields();
                });
            }
        );    
    }

    removePendingReq(student:User){
        this.classroomService.removePendingReq(student, this.currentRoom).subscribe(
            () => {
                this.userService.removePendReq(student,this.currentRoom).subscribe(() => 
                {this.reloadFields();}); 
        });    
    }

    removeStudent(student:User){
        this.classroomService.removeStud(student, this.currentRoom).subscribe(
            () => {
                this.userService.removeStud(student,this.currentRoom).subscribe(() => 
                {
                    this.reloadFields();
                });
        });
    }
    
    getSnippets(){
        this.snippetService.getSnippetsForTeachId(this.currentUser._id).subscribe((snippets) => {
            console.log(snippets);
            this.snippets = snippets;
        });
    };
}
