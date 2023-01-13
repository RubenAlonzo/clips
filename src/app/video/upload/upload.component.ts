import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  inSubmission = false
  alertMsg = ''
  alertColor = 'blue'
  showAlert = false
  isDragOver = false
  nextStep = false
  file: File | null = null
  percentage = 0
  showPercentage = false

  constructor(private storage: AngularFireStorage){}

  uploadForm = new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ], 
      nonNullable: true}),
  })

  uploadFile(){
    this.showAlert = true
    this.inSubmission = true
    this.showPercentage = true
    this.alertColor = 'blue'
    this.alertMsg = 'Your video is being uploaded'
    
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    
    const task = this.storage.upload(clipPath, this.file)

    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertColor = 'green'
        this.alertMsg = 'Success! Your clip is ready'
        this.showPercentage = false
        this.inSubmission = false
      },
      error: (error) => {
        this.alertColor = 'red'
        this.alertMsg = 'Upload failed! Try again later'
        this.inSubmission = true
        this.showPercentage = false
        console.error(error)
      }
    })
  }

  storeFile(event: Event){
    this.isDragOver = false

    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null
    if(!this.file || this.file.type !== 'video/mp4') return;
    this.uploadForm.controls.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
    console.log(this.file)
  }
}
