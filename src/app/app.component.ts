import { Component, OnInit, ViewChild  } from '@angular/core';
import { GlobalvariablesComponent } from './cruiseComponents/core/globalvariables/globalvariables.component';
import { CodeMirror } from 'codemirror';
//import 'codemirror'
//import 'codemirror/mode/javascript/javascript'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    config = { 
            lineNumbers: true,
            lineWrapping: false,
            width: '100%',
            height: '100%',
            lineSeparator:'\n',
            mode: 'javascript'};
    
    code = '//Sample JavaScript Imports\n'+
            'var CollectionsAndFiles = new JavaImporter(\n'+
            '        java.util, java.io,\n'+
            '        com.corecruise.cruise.services.utils.ResponseObject,\n'+
            '        com.corecruise.cruise.SessionObject);\n'+
            '    );\n'+
            '//Optional \"with\" block where imports can be used.\n'+
            'with (CollectionsAndFiles) {\n'+
            '/*   Objects available:\n'+
            '       cruSession - com.corecruise.core.SessionObject\n'+
            '       cruService - com.corecruise.cruise.services.utils.Services\n'+
            '       cruCore    - com.corecruise.coreCore.CoreCruise\n'+
            '       cruResponse- com.corecruise.cruise.services.utils.GenericSessionResp */\n\n'+
            '  var ser = cruSession.getService(\"InsertService\");//Sample get service from cruSession\n'+
            '}//end with';

    @ViewChild('editor') editor: any;
    constructor(private gv: GlobalvariablesComponent) {
        console.log("Hello from app:"+gv.bucketName);
        //this.code = '// Some code...';
    }
    removeOddChars(strValue){

        strValue = strValue.replace(/\\n/g, '\n');
        //strValue = strValue.replace(/&nbsp;/g ,' ');
        //strValue = strValue.replace(/&gt;/g, '>');
        //strValue = strValue.replace(/&lt;/g, '<');
        //strValue = strValue.replace(/&amp;/g, '&');
        //console.log("((((((((((("+strValue+"))))))))))))))");
        return strValue;
    }
    editorFocus(editorEvent: CodeMirror){
     
        let cm = editorEvent.instance;
        console.log(cm.doc.children[0]);
        setTimeout(function() {
            cm.refresh();
            cm.setSize('100%', '100%');
            let posCursor = {line: 0, ch: 0};
            posCursor.line = cm.doc.children[0].lines.length-1;
            posCursor.ch = cm.doc.children[0].lines[posCursor.line].text.length;
            
            cm.doc.setCursor(posCursor);
        }, 200); 
    }
    copyCode(editorEvent: any){
        
        //this.editor.doc.setValue(this.editor.doc.getValue()+"\ncopy")
        //this.editor.instance.doc.setValue(this.editor.instance.doc.getValue());
        //console.log(this.editor.instance.doc.getValue());

    }
    codeConvert(editorEvent: any){
        
        //this.editor.value = this.editor.value;
        //console.log(this.editor.value);

    }
    onChange(){
        //console.log("change");
        //this.editor.instance.doc.setValue(this.editor.instance.doc.getValue());
    }
    pasteCode(){
        this.editor.instance.doc.setValue(this.removeOddChars(this.editor.instance.doc.getValue()));
        //this.editor.instance.doc.setValue( this.removeOddChars(this.editor.instance.doc.getValue()));

    }
    ngOnInit(){

        
    }
    ngViewChild(){
        console.log("VIKEWwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"); 
        
    }
    
}
