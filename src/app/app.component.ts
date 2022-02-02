import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'base64img';

  base64textString: string = "";

  constructor(private sanitizer:DomSanitizer){
  }
  
  handleFileSelect(evt: any){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt: any) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }

  //Call this method in the image source, it will sanitize it.
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64textString);
}
}
