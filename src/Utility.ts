export class Utility {
    constructor() {}

    private static mimes() {
        /*
         * Only WOFF and EOT mime types for fonts are 'real'
         * see http://www.iana.org/assignments/media-types/media-types.xhtml
         */
        const WOFF = 'application/font-woff';
        const JPEG = 'image/jpeg';

        return {
            woff: WOFF,
            woff2: WOFF,
            ttf: 'application/font-truetype',
            eot: 'application/vnd.ms-fontobject',
            png: 'image/png',
            jpg: JPEG,
            jpeg: JPEG,
            gif: 'image/gif',
            tiff: 'image/tiff',
            svg: 'image/svg+xml',
        };
    }

    public static escape() {}

    public static parseExtension() {}
    public static mimeType() {}
    public static dataAsUrl() {}
    public static isDataUrl() {}
    public static canvasToBlob() {}
    public static resolveUrl() {}
    public static getAndEncode() {}
    public static uuid() {}
    public static delay() {}
    public static asArray() {}
    public static escapeXhtml() {}
    public static makeImage() {}
    public static width() {}
    public static height() {}
}

// function newUtil() {
//     return {
//         escape: escape,
//         parseExtension: parseExtension,
//         mimeType: mimeType,
//         dataAsUrl: dataAsUrl,
//         isDataUrl: isDataUrl,
//         canvasToBlob: canvasToBlob,
//         resolveUrl: resolveUrl,
//         getAndEncode: getAndEncode,
//         uid: uid(),
//         delay: delay,
//         asArray: asArray,
//         escapeXhtml: escapeXhtml,
//         makeImage: makeImage,
//         width: width,
//         height: height
//     };

//     function mimes() {
//         /*
//          * Only WOFF and EOT mime types for fonts are 'real'
//          * see http://www.iana.org/assignments/media-types/media-types.xhtml
//          */
//         let WOFF = 'application/font-woff';
//         let JPEG = 'image/jpeg';

//         return {
//             'woff': WOFF,
//             'woff2': WOFF,
//             'ttf': 'application/font-truetype',
//             'eot': 'application/vnd.ms-fontobject',
//             'png': 'image/png',
//             'jpg': JPEG,
//             'jpeg': JPEG,
//             'gif': 'image/gif',
//             'tiff': 'image/tiff',
//             'svg': 'image/svg+xml'
//         };
//     }

//     function parseExtension(url) {
//         let match = /\.([^\.\/]*?)$/g.exec(url);
//         if (match) return match[1];
//         else return '';
//     }

//     function mimeType(url) {
//         let extension = parseExtension(url).toLowerCase();
//         return mimes()[extension] || '';
//     }

//     function isDataUrl(url) {
//         return url.search(/^(data:)/) !== -1;
//     }

//     function toBlob(canvas) {
//         return new Promise(function (resolve) {
//             let binaryString = window.atob(canvas.toDataURL().split(',')[1]);
//             let length = binaryString.length;
//             let binaryArray = new Uint8Array(length);

//             for (let i = 0; i < length; i++)
//                 binaryArray[i] = binaryString.charCodeAt(i);

//             resolve(new Blob([binaryArray], {
//                 type: 'image/png'
//             }));
//         });
//     }

//     function canvasToBlob(canvas) {
//         if (canvas.toBlob)
//             return new Promise(function (resolve) {
//                 canvas.toBlob(resolve);
//             });

//         return toBlob(canvas);
//     }

//     function resolveUrl(url, baseUrl) {
//         let doc = document.implementation.createHTMLDocument();
//         let base = doc.createElement('base');
//         doc.head.appendChild(base);
//         let a = doc.createElement('a');
//         doc.body.appendChild(a);
//         base.href = baseUrl;
//         a.href = url;
//         return a.href;
//     }

//     function uid() {
//         let index = 0;

//         return function () {
//             return 'u' + fourRandomChars() + index++;

//             function fourRandomChars() {
//                 /* see http://stackoverflow.com/a/6248722/2519373 */
//                 return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
//             }
//         };
//     }

//     function makeImage(uri) {
//         return new Promise(function (resolve, reject) {
//             let image = new Image();
//             image.onload = function () {
//                 resolve(image);
//             };
//             image.onerror = reject;
//             image.src = uri;
//         });
//     }

//     function getAndEncode(url) {
//         let TIMEOUT = 30000;
//         if (domtoimage.impl.options.cacheBust) {
//             // Cache bypass so we dont have CORS issues with cached images
//             // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
//             url += ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime();
//         }

//         return new Promise(function (resolve) {
//             let request = new XMLHttpRequest();

//             request.onreadystatechange = done;
//             request.ontimeout = timeout;
//             request.responseType = 'blob';
//             request.timeout = TIMEOUT;
//             request.open('GET', url, true);
//             request.send();

//             let placeholder;
//             if (domtoimage.impl.options.imagePlaceholder) {
//                 let split = domtoimage.impl.options.imagePlaceholder.split(/,/);
//                 if (split && split[1]) {
//                     placeholder = split[1];
//                 }
//             }

//             function done() {
//                 if (request.readyState !== 4) return;

//                 if (request.status !== 200) {
//                     if (placeholder) {
//                         resolve(placeholder);
//                     } else {
//                         fail('cannot fetch resource: ' + url + ', status: ' + request.status);
//                     }

//                     return;
//                 }

//                 let encoder = new FileReader();
//                 encoder.onloadend = function () {
//                     let content = encoder.result.split(/,/)[1];
//                     resolve(content);
//                 };
//                 encoder.readAsDataURL(request.response);
//             }

//             function timeout() {
//                 if (placeholder) {
//                     resolve(placeholder);
//                 } else {
//                     fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
//                 }
//             }

//             function fail(message) {
//                 console.error(message);
//                 resolve('');
//             }
//         });
//     }

//     function dataAsUrl(content, type) {
//         return 'data:' + type + ';base64,' + content;
//     }

//     function escape(string) {
//         return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
//     }

//     function delay(ms) {
//         return function (arg) {
//             return new Promise(function (resolve) {
//                 setTimeout(function () {
//                     resolve(arg);
//                 }, ms);
//             });
//         };
//     }

//     function asArray(arrayLike) {
//         let array = [];
//         let length = arrayLike.length;
//         for (let i = 0; i < length; i++) array.push(arrayLike[i]);
//         return array;
//     }

//     function escapeXhtml(string) {
//         return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
//     }

//     function width(node) {
//         let leftBorder = px(node, 'border-left-width');
//         let rightBorder = px(node, 'border-right-width');
//         return node.scrollWidth + leftBorder + rightBorder;
//     }

//     function height(node) {
//         let topBorder = px(node, 'border-top-width');
//         let bottomBorder = px(node, 'border-bottom-width');
//         return node.scrollHeight + topBorder + bottomBorder;
//     }

//     function px(node, styleProperty) {
//         let value = window.getComputedStyle(node).getPropertyValue(styleProperty);
//         return parseFloat(value.replace('px', ''));
//     }
// }
