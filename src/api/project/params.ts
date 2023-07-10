// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

import {AssetDefinition} from "@platform/assets/Assets";

export class CreateAssetParamas {
    name = ""
    uid = ""
    subtype = ""
    extension = ""
    description = ""
    assetType = ""
    project_uid = ""
    author = ""

    assetDefinition: AssetDefinition | any = null


}



export interface CreateProjectParams {
    name: string,
    uid: string,
    project_uid: string,
    author: string,
    lat_lon: string,
    project_type: string,
    description: string,

}