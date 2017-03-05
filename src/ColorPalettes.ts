import {IPalette} from './interfaces/IPalette';

//load palletes
export class ColorPalettes {
    private paletteIndex: 0;
    public palettes: null;
    private activePalette: null;
    constructor() {
    }
    public loadColors = function(pindex:number):Promise<any> {
      this.paletteIndex = pindex;
        return new Promise(function(resolve, reject) {
            let url: string = 'src/colors.json';
            let xhr: any = new XMLHttpRequest();
            xhr.open('GET', url);
            var data: any;
            xhr.onload =
            function() {
              if (this.status >= 200 && this.status < 300) {
                // Success!
                data = JSON.parse(xhr.responseText);
                let activePalette:IPalette = data.colors[pindex];
                resolve(activePalette);
              } else {
                console.log("We reached our target server, but it returned an error")
              }
            };

            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }
}
