interface palette {
    background: number,
    headline: number,
    font: number,
    squaredark: number,
    squarelight: number,
    buttonsolid: number,
    buttonoutline: number,
    buttonbackground: number,
    dot: number,
    line: number
}

export class ColorPalettes {
    private paletteIndex: 0;
    public palettes: null;
    private activePalette: null;
    constructor() {
    }
    public loadColors = function() {
        return new Promise(function(resolve, reject) {
            let url: string = 'src/colors.json';
            let xhr: any = new XMLHttpRequest();

            ///GET JQUERY!!!!

            //xhr.responseType = 'json';
            //xhr.json = true,
            // xhr.setRequestHeader('application/json', 'odata=verbose');
            // xhr.setRequestHeader('Accept', 'application/json');
            xhr.open('GET', url);
            var data: any;
            xhr.onload =
            function() {
              if (this.status >= 200 && this.status < 300) {
                // Success!
                resolve(data = JSON.parse(xhr.responseText));
              } else {
                // We reached our target server, but it returned an error

              }
            };
            // function() {
            //     if (this.status >= 200 && this.status < 300) {
            //         resolve(JSON.parse(xhr.response));
            //     } else {
            //         reject({
            //             status: this.status,
            //             statusText: xhr.statusText
            //         });
            //     }
            // };
            xhr.onerror = function() {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    // public loadColors = function():any {
    //     var req = new XMLHttpRequest;
    //     let url: string = 'src/colors.json';
    //     req.overrideMimeType("application/json");
    //     req.open('GET', url, true);
    //     var target = this;
    //     req.onload = function() { target.parseJSON(req, url) };
    //     req.send(null);
    // }
    // parseJSON = function(req, url): object {
    //     if (req.status == 200) {
    //         this.palettes = JSON.parse(req.responseText);
    //         return this.palettes[this.activePalette];
    //     }
    // }
    // changePalette = function(index: number): void {
    //     console.log("changePalette");
    //     this.paletteIndex = index;
    //     this.getPalette();
    // }
}


        //return this.colorLibrary[this.paletteIndex];


        // console.log('index: ' + colors);
        // let colors: palette = JSON.parse(data);
        // console.log('colors: ' + colors[index]);
        // return colors[index];

// = (function (e) {
//            return function() {
            //  console.log("json loaded1: " + this.colorLibrary);
            //  this.colorLibrary = JSON.parse(this.responseText);
            //  console.log("json loaded2: " + this.colorLibrary);
//
//              this.changePalette(0);
//            }
//        }(this));



// let colors: palette[] = [];

// let currentScheme: number;
