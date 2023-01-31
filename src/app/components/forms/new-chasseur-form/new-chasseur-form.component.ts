import {Component, OnInit} from '@angular/core';
import {IChasseur} from "../../../interfaces/ichasseur";
import {ChasseurService} from "../../../services/chasseur.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ChasseurType} from "../../../enums/chasseur-type";
import {ChasseurEtat} from "../../../enums/chasseur-etat";

@Component({
  selector: 'app-new-chasseur-form',
  templateUrl: './new-chasseur-form.component.html',
  styleUrls: ['./new-chasseur-form.component.scss']
})
export class NewChasseurFormComponent implements OnInit {
  private newChasseur!: IChasseur;
  protected form!: FormGroup;
  protected types: any[] = Object.values(ChasseurType);
  protected etats: any[] = Object.values(ChasseurEtat);
  protected selectedEtat!: ChasseurEtat;
  protected selectedType!: ChasseurType;

  constructor(private chasseurService: ChasseurService) {  }

  ngOnInit(): void {
    this.form = new FormGroup<any>({
      chasseur: new FormGroup<any>({
        nom: new FormControl(''),
        typeChasseur: new FormControl(ChasseurType.XWING),
        etatChasseur: new FormControl(ChasseurEtat.OPERATIONNEl)
      })
    })
  }

  public submit() {
    console.log("essaie de soumettre : " + this.form.get("chasseur")?.value)
    this.newChasseur = this.form.get("chasseur")?.value;
    this.chasseurService.saveChasseur(this.newChasseur).subscribe(chasseur=> {
      console.log("Chasseur enregistré !")
    })
  }

}
