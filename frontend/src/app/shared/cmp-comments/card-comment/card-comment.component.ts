import { Component, Input } from '@angular/core';
import { Comentario } from 'src/app/core/models/comment.model';

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.css']
})
export class CardCommentComponent {
  @Input() dataComment!: Comentario;
}
