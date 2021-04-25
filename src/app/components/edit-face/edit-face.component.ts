import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-edit-face',
  templateUrl: './edit-face.component.html',
  styleUrls: ['./edit-face.component.css']
})
export class EditFaceComponent implements OnInit {
  value: number;
  data: any

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.data = this.dataService.getLatentSpace();
    console.log(this.data);
  }

}
