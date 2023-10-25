import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comentario } from 'src/app/core/models/comment.model';
import { CommentsService } from 'src/app/core/services/comments.service';

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

  constructor(
    private commentService: CommentsService,
    private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
        body: '',
        slug: this.slugProduct
      })
    }

  ngOnInit(): void {        
    this.commentService.get(this.slugProduct)
    .subscribe((data) => {
      console.log(data);
      
    })
  }

  createComment() {    
    this.commentService.create(this.form.value)
    .subscribe((data) => {
      console.log(data);
      
    })
  }
  

  // getListFiltered(params: filter){
  //   this.lastParams = params;
  //   if(this.titleProducts){
  //     if(!params) {
  //       params = {}
  //     }
  //     params.title = this.titleProducts;
  //   } 
  //   this.commentService.get(params)
  //   .subscribe((data) => {  
  //     this.dataProducts = data.products;
  //     this.numItems = data.countProducts;
  //   })
  // }

  testPagination(data: any) {
    let params: any = {};

    params['limit'] = data.limit;
    params['offset'] = data.offset;

    // this.getListFiltered(params)

  }
}
