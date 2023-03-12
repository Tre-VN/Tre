"use strict";
import fs from "fs";
import { Console } from "../../console.js";
import localization from "../../localization.js";
export default function processFilePaths(executor_file_need_avoid) {
    let filePath = Console.ReadLine();
    while (filePath !== '') {
        if (filePath === './') {
            console.error(`"./" ${localization("not_a_valid_file_path")}`);
            filePath = Console.ReadLine();
            continue;
        }
        if (filePath === executor_file_need_avoid) {
            console.error(`${localization("cannot_apply_patch_file_is_using")} ${executor_file_need_avoid}`);
            filePath = Console.ReadLine();
            continue;
        }
        if (filePath[0] === '"' && filePath[filePath.length - 1] === '"') {
            filePath = filePath.slice(1, -1);
        }
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                console.error(`${filePath} ${localization("is_a_directory_not_a_file")}`);
                filePath = Console.ReadLine();
                continue;
            }
            if (!stats.isFile() || !filePath.toLowerCase().endsWith('.json')) {
                console.error(`${filePath} ${localization("is_a_directory_not_a_valid_json_file")}`);
                filePath = Console.ReadLine();
                continue;
            }
            break;
        }
        catch (err) {
            console.error(`${filePath} ${localization("not_a_valid_file_path")}`);
            filePath = Console.ReadLine();
        }
    }
    return filePath;
}
