import { BuscadorService } from './../../services/buscador.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private buscadorService:BuscadorService) {
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
   }
public error:any;
public form: FormGroup;
public categorias:any = []
public items:any = []

public input:any = '';
  ngOnInit(): void {
    this.buscadorService.getCategorias().then((data:any)=>{
      this.categorias = data['data']['categories']
      this.buscadorService.getItemByCategory('').then((data:any)=>{
        this.items = []
        this.items = data.data.items        
      }).catch((err)=>{
        console.log(err);
        
      })
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  public busquedaItem(){
    this.items = []
    this.buscadorService.getItemByText(this.input).then((data:any)=>{
      this.items = data.data.items
      console.log(this.items);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  onCheckboxChange(e:any) {
    const website: FormArray = this.form.get('website') as FormArray;
    let stringCategoria:string = ''
    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
      this.form.value.website.forEach((cate: any) => {
        stringCategoria = stringCategoria  + cate + ';'
        
      });
      this.buscadorService.getItemByCategory(stringCategoria).then((data:any)=>{
        this.items = []
        this.items = data.data.items
        console.log(this.items);
        
      }).catch((err)=>{
        console.log(err);
        
      })
      
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
       this.form.value.website.forEach((cate: any) => {
        stringCategoria = stringCategoria  + cate + ';'
        
      });
       this.buscadorService.getItemByCategory(stringCategoria).then((data:any)=>{
        this.items = []

        this.items = data.data.items
        console.log(this.items);
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  }

}
