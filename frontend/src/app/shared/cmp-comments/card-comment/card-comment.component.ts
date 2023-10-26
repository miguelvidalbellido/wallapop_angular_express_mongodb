import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';
import { Comentario } from 'src/app/core/models/comment.model';
import { CommentsService } from 'src/app/core/services/comments.service';

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.css']
})
export class CardCommentComponent implements OnInit {
  
  @Input() dataComment!: Comentario;

  canDelete?: boolean = false;

  constructor(private _userService: UserService,
    private _commentsService: CommentsService){ }

  ngOnInit(): void { 
    this._userService.currentUser.subscribe(data => {      
      this.dataComment.commentOwner == data.username 
      ? this.canDelete = true
      : this.canDelete = false
    });
  }

  deleteComment(id: String){
    this._commentsService.delete(id)
    .subscribe((data) => {
      console.log(data);
      
    })
  }
}
