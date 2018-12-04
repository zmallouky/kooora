import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
    private posts : Post[] = [];
    private postUpdated = new Subject<Post[]>();

    
    constructor(private http: HttpClient) {}

    getPost() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    id: null,
                    hometeam: post.match_hometeam_name,
                    awayteam: post.match_awayteam_name,
                    hometeamScore: post.match_hometeam_score,
                    awayteamScore: post.match_awayteam_score
                }
            });
        }))
        .subscribe( (transofrmedposts) => {
            this.posts = transofrmedposts;
            this.postUpdated.next(...[this.posts])
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }
    
    addPost(hometeam: string, awayteam: string, hometeamScore: string, awayteamScore: string) {
        const post: Post = {
            id : null,
            hometeam: hometeam,
            awayteam: awayteam,
            hometeamScore: hometeamScore,
            awayteamScore: awayteamScore
        }
        this.posts.push(post);
        this.postUpdated.next([...this.posts])
    }
}