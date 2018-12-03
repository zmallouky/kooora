import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post.service';


@Component({
    selector:  'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls : ['./post-create.component.css']
                
})
export class PostCreateComponenet {

    constructor (public postService : PostService) {};
    
    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.postService.addPost(form.value.hometeam, form.value.awayteam, form.value.hometeamScore, form.value.awayteamScore);
        form.resetForm();
    }
    
}