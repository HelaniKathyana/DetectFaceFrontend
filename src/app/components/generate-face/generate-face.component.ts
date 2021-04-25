import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageServiceService } from '../../services/image-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-generate-face',
  templateUrl: './generate-face.component.html',
  styleUrls: ['./generate-face.component.css']
})
export class GenerateFaceComponent implements OnInit {

  constructor(private imageService: ImageServiceService,
    private sanitizer: DomSanitizer,
    private dataService: DataService) {
    this.filteredAttributes = this.facialCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFacialAttributes.slice()));
  }
  isEdit = false;
  data: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  editImageUrl: any;
  enableImages = true;
  value: number;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  selected_latentCode: number;
  isEditing = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  facialCtrl = new FormControl();
  filteredAttributes: Observable<string[]>;
  facialAttributes: string[] = ['Arched_Eyebrows'];
  allFacialAttributes: string[] = ['5_o_Clock_Shadow', 'Arched_Eyebrows', 'Attractive', 'Bags_Under_Eyes', 'Bald', 'Bangs', 'Big_Lips', 'Big_Nose',
    'Black_Hair', 'Blond_Hair', 'Blurry', 'Brown_Hair', 'Bushy_Eyebrows', 'Chubby', 'Double_Chin', 'Eyeglasses', 'Goatee',
    'Gray_Hair', 'Heavy_Makeup', 'High_Cheekbones', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'Narrow_Eyes', 'No_Beard',
    'Oval_Face', 'Pale_Skin', 'Pointy_Nose', 'Receding_Hairline', 'Rosy_Cheeks', 'Sideburns', 'Smiling', 'Straight_Hair',
    'Wavy_Hair', 'Wearing_Earrings', 'Wearing_Hat', 'Wearing_Lipstick', 'Wearing_Necklace', 'Wearing_Necktie', 'Young'];
  @ViewChild('facialInput') facialInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.facialAttributes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.facialCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.facialAttributes.indexOf(fruit);

    if (index >= 0) {
      this.facialAttributes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.facialAttributes.push(event.option.viewValue);
    this.facialInput.nativeElement.value = '';
    this.facialCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFacialAttributes.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  generateImage(): void {
    this.enableImages = false;
    this.img1 = false;
    this.img2 = false;
    this.img3 = false;
    this.img4 = false;
    this.imageService.generateImage().subscribe(data => {
      this.data = data;
      this.img1 = 'http://localhost:8000/static/' + data.data[0]
      this.img2 = 'http://localhost:8000/static/' + data.data[1]
      this.img3 = 'http://localhost:8000/static/' + data.data[2]
      this.img4 = 'http://localhost:8000/static/' + data.data[3]
      this.enableImages = true;
    }, error => {
      console.log(error)
    })
  }

  editImage(number) {
    this.editImageUrl = 'http://localhost:8000/static/' + this.data.data[number];
    console.log(this.editImageUrl)
    this.isEdit = true;
    this.selected_latentCode = number;
    this.value1 = 50;
    this.value2 = 50;
    this.value3 = 50;
    this.value4 = 50;
    this.value5 = 50;
  }

  goBack() {
    this.isEdit = false
  }

  applyChanges() {
    this.isEditing = true;
    let latent_code = this.data.latent_codes[this.selected_latentCode]
    let params = [this.value1, this.value2, this.value3, this.value4, this.value5]
    let formdata = new FormData();
    formdata.append('code', latent_code)
    formdata.append('params', JSON.stringify(params))
    this.imageService.editImage(formdata).subscribe(data => {
      console.log(data)
      this.editImageUrl = 'http://localhost:8000/static/' + data.img_name;
      this.isEditing = false;
    })
  }

}
