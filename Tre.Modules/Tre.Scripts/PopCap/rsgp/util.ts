"use strict";
import unpack from "./unpack_rsgp.js";
import { writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import fs from "node:fs";
import path from "path";
import pack from './rsgp_pack.js';
import { read_dir, readjson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import { readline_integer } from '../../../../Tre.Modules/Tre.Progress/Readline/util.js';
import localization from "../../../Tre.Callback/localization.js";
export function unpack_rsgp(rsgp_data: any, rsgp_path: string, decode_image: boolean, decode_rton: boolean, removeinfo: boolean): void {
    unpack(rsgp_data, rsgp_path, decode_image, decode_rton, removeinfo);
    return;
}
export async function pack_rsgp(dir: string) {
    let image_fmt: number = 0;
    let TreInfo: any = new Array();
    let encode_image: boolean = false;
    await fs.existsSync(`${dir}/TreRSGPInfo.json`) ? TreInfo = readjson(`${dir}/TreRSGPInfo.json`) : {};
    const items = read_dir(dir);
    for (let item of items) {
        if (!encode_image) {
            if (path.parse(item).ext.toUpperCase() === '.PNG' && TreInfo.UseTreRSGPInfo !== true) {
                console.log(color.fggreen_string(`◉ ${localization("execution_argument")}: ${localization("popcap_ptx_encode")}`));
                console.log('   0. PopCap PTX RGBA8888 (0)');
                console.log('   1. PopCap PTX ARGB8888 (0)');
                console.log('   2. PopCap PTX RGB_PVRTC4_A_8 (30)');
                console.log('   3. PopCap PTX RGB_ETC1_A_8 (147)');
                encode_image = true;
                image_fmt = readline_integer(0, 3)
                break;
            }
        }
    };
    const rsgp_data = await pack(dir, encode_image, (image_fmt !== 0) ? image_fmt : 0);
    await fs.writeFileSync(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`, rsgp_data);
}