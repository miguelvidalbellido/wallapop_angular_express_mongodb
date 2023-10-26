import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comentario } from 'src/app/core/models/comment.model';
import { CommentsService } from 'src/app/core/services/comments.service';
import { ToastrComponent } from '../../toastr/toastr.component';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit{

  @Input()
  slugProduct?: String;

  dataComments?: Comentario[];

  numItems?: number;

  form: FormGroup;

  @ViewChild(ToastrComponent) snackBar!: ToastrComponent;

  constructor(
    private commentService: CommentsService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        body: '',
        slug: this.slugProduct
      })
    }

  ngOnInit(): void {   
    this.getComments() 
  }

  getComments(){
    this.commentService.get(this.slugProduct)
    .subscribe((data) => {
      this.dataComments = data;
    })
  }

  createComment() {
    this.form.patchValue({slug: this.slugProduct})
    this.commentService.create(this.form.value)
    .subscribe((data) => {
      this.snackBar.showSnackBar('Se ha creado el comentario')
      this.form.get('body')?.setValue('')
      this.getComments()
    })
  }

  testPagination(data: any) {
    let params: any = {};

    params['limit'] = data.limit;
    params['offset'] = data.offset;
  }
}
