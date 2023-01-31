import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { RebelleService } from 'src/app/services/rebelle.service';
import {Race} from "../../../enums/race";
import {IRebelle} from "../../../interfaces/IRebelle";

@Component({
  selector: 'app-new-rebelle-form',
  templateUrl: './new-rebelle-form.component.html',
  styleUrls: ['./new-rebelle-form.component.scss']
})
export class NewRebelleFormComponent implements OnInit {
  public form!: FormGroup;
  protected races: any[] = Object.values(Race);
  protected selectedRace!: Race;
  private MAX_AGE: number = 800;
  private MIN_AGE: number = 10;
  private newRebelle: IRebelle = {
    nom:"",
    prenom:"",
    race:"",
    age: 0
  }
  
  constructor(private rebelleService: RebelleService) {}

  public submit(): void {
    console.log("submit", this.form.get('rebelle')?.value);
    this.newRebelle = this.form.get('rebelle')?.value;
    console.log(this.form.getRawValue());
    this.rebelleService.saveRebelle(this.newRebelle).subscribe(rebelle => {
      
    })
    
    
  };


  ngOnInit(): void {
    this.form = new FormGroup<any>({
      rebelle: new FormGroup<any>({
        nom: new FormControl(""),
        prenom: new FormControl("", Validators.minLength(2)),
        race: new FormControl(""),
        age: new FormControl("", [Validators.min(this.MIN_AGE), Validators.max(this.MAX_AGE), Validators.required])
      })
    });

  }

}
