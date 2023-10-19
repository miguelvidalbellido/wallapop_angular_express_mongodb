import { Component, Input, OnInit } from '@angular/core';
import { Like, User, UserService } from 'src/app/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit{

  @Input()
  slugProduct!: String;
  @Input()
  like!: boolean; 

  user?: User;


  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

  }

  controlClick(slug: String) {
    this.user = this.userService.getCurrentUser();
  
    if(Object.entries(this.user).length !== 0) {
      console.log("hay un usuario activo");
      // Subimos la peticion al padre para que realize el cambio en la base de datos
      
      // if -- comprobamos si estaba en true para ponerlo en false y cambiar el color y viceversa creamos una funcion
    } else {
      console.log("no hay usuario activo redireccionamos a login");
    }

  }

}
