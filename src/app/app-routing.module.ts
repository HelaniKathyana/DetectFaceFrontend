import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenerateFaceComponent} from "./components/generate-face/generate-face.component";
import {EditFaceComponent} from "./components/edit-face/edit-face.component";


const routes: Routes = [
  { path: '', component: GenerateFaceComponent },
  // { path: 'face-editor', component: EditFaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
