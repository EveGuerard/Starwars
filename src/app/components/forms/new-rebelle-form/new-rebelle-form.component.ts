import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { RebelleService } from 'src/app/services/rebelle.service';
import {Race} from "../../../enums/race";
import {Irebelle} from "../../../interfaces/irebelle";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PiloteService} from "../../../services/pilote.service";
import {IPilote} from "../../../interfaces/ipilote";

@Component({
  selector: 'app-new-rebelle-form',
  templateUrl: './new-rebelle-form.component.html',
  styleUrls: ['./new-rebelle-form.component.scss']
})
export class NewRebelleFormComponent implements OnInit {
  public form!: FormGroup;
  protected races: any[] = Object.values(Race).filter(value => typeof value !== 'number');
  protected selectedRace!: Race;
  private MAX_AGE: number = 800;
  private MIN_AGE: number = 10;
  private newRebelle!: IPilote;

  constructor(private piloteService: PiloteService, private snackbar: MatSnackBar) {}

  public submit(): void {
    console.log("submit", this.form.get('rebelle')?.value);
    this.newRebelle = this.form.get('rebelle')?.value;
    console.log(this.form.getRawValue());
    this.piloteService.savePilote(this.newRebelle).subscribe(  rebelle => {
        this.snackbar.open(this.newRebelle.nom+" vient d'être inscrit en formation !", '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error => {
        this.snackbar.open("Erreur lors de l'enregistrement du rebelle", '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      })
  };

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      rebelle: new FormGroup<any>({
        id: new FormControl(null),
        nom: new FormControl(""),
        race: new FormControl(""),
        age: new FormControl("", [Validators.min(this.MIN_AGE), Validators.max(this.MAX_AGE), Validators.required])
      })
    });
  }

}
