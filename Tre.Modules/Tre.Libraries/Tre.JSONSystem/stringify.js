"use strict";
import JSONC from 'jsonc-simple-parser';
export default function (data) {
    return JSONC.stringify(data, null, '\t');
}