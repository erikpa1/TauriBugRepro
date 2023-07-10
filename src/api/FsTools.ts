import PlatformDispatcher from "@api/PlatformDispatcher";
import {convertFileSrc} from "@tauri-apps/api/tauri";
import {sep} from "@tauri-apps/api/path";

export default class FsTools {

    static WORK_DIR = "/"

    static ConvertFilePath(path: string): string {
        if (PlatformDispatcher.IsDesktop()) {
            const tmp = convertFileSrc(path)//FsApi.normalizePath(FsApi.RESOURCES + path)
            return tmp
        } else {
            return path
        }
    }

    static NormalizePath(path: string): string {
        return path.replaceAll("/", sep)
    }

    static GetPlatformPath(path: string) {
        return FsTools.NormalizePath(`${FsTools.WORK_DIR}${path}`)
    }


}