"use strict";
import { SmartBuffer } from "smart-buffer";
import BeautifyOffset from "../../rsgp/beautify_offset.js";
export default function (headrsb_info: any, rsgpfile_info: any, file_list: any, rsgp_list: any, composite_info: any, composite_list: any, ptx_info: any) {
    const rsb_file_data = new SmartBuffer();
    rsb_file_data.writeBuffer(headrsb_info[0]);
    rsb_file_data.writeBuffer(file_list);
    rsb_file_data.writeBuffer(rsgp_list);
    rsb_file_data.writeBuffer(composite_info);
    rsb_file_data.writeBuffer(composite_list);
    rsb_file_data.writeBuffer(rsgpfile_info[0]);
    rsb_file_data.writeBuffer(rsgpfile_info[1]);
    rsb_file_data.writeBuffer(ptx_info);
    rsb_file_data.writeBuffer(Buffer.alloc(headrsb_info[2]));
    for (let rsgp_file of rsgpfile_info[2]) {
        rsb_file_data.writeBuffer(rsgp_file);
    }
    const empty_byte_length_to_fill = BeautifyOffset(rsb_file_data.length);
    rsb_file_data.writeBuffer(Buffer.alloc(empty_byte_length_to_fill));
    return rsb_file_data.toBuffer();
}