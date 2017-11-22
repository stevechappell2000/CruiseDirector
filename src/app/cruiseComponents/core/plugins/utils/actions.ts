/**
               "actions": [
                    {
                        "actionName": "info",
                        "actionDesc": "getPlugin Information",
                        "actionParams": [
                            {
                                "paramName": "ID",
                                "paramDesc": "Unique Identitifer",
                                "paramDefault": "3fee7fa1-655f-484e-9ff4-57ddbb8349ff",
                                "paramRequired": "true"
                            },
                            {
                                "paramName": "Sample",
                                "paramDesc": "Unused Parameter",
                                "paramDefault": "unknown",
                                "paramRequired": "false"
                            }
                        ]
                    },

 */

import { actionParams } from './actionparams';
export class actions {
    constructor(public actionName: string, public actionDesc: string, public actionParams: actionParams[] = []){

    }
}