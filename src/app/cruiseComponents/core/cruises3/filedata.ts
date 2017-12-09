/**
 * 
            {
                "bucketName": "elasticbeanstalk-us-west-2-327888233030",
                "key": "2017339DYC-CuiseSite-0.0.1-SNAPSHOT.war",
                "size": 9871800,
                "lastModified": 1512434274000,
                "storageClass": "STANDARD",
                "owner": {
                    "displayName": "stevechappell2000",
                    "id": "c97123d5b8f09d4a6b49c5b95e3ab396b16504930ecbbbce3c1ad4c6568bd9ba"
                },
                "etag": "4f6cd9e5f2874ef3bac2c09dd04127d8"
            },
 
 * 
 */


export class filedata {
    a : string;
    constructor(public bucketName:string, public key: string, public size: string, public lastModified: string, public storageClass: string, public owner: string, public etag: string){
        //this.Actions = actions;
        //console.log();
    }
}