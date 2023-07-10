import React from 'react'

import './App.css'

import FsTools from "@api/FsTools";
import TauriOsPlugin from "./tauri/plugin_os";


export default function App() {


    const [isLoading, setIsLoading] = React.useState(true)

    const init = async () => {

        FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()


    }

    React.useEffect(() => {
        setIsLoading(true)

        init().then(() => {
            setIsLoading(false)

        })

    }, [])

    if (isLoading) {

        return (
            <div>Loading</div>
        )

    } else {

        return (
            <div>
                <_Working/>
                <_NotWokrking/>
            </div>

        )
    }

}


function _Working() {

    const PATH = FsTools.GetPlatformPath("ShouldBeWorking.jpg")

    //TODO THIS SHOULD WORK TOO!!! this is only mechanism how to force refresh of some image from cache
    const NOT_WORKING_PATH = `${PATH}?random=${Math.random()}`

    return (
        <img
            src={FsTools.ConvertFilePath(PATH)}
            style={{height: "150px", width: "300px"}}
        />
    )
}

function _NotWokrking() {

    const TO_BE_COPIED = FsTools.GetPlatformPath("ToBeCopied.jpg")
    const TARGET = FsTools.GetPlatformPath("Target.jpg")

    const [pathVal, setPathVal] = React.useState({path: TARGET})

    const [wasRerfreshedOnce, setWasRefreshedOnce] = React.useState(false)

    function copyClicked() {
        TauriOsPlugin.CopyFile(TO_BE_COPIED, TARGET).then(() => {
            console.log("File copied")
            setPathVal({path: TARGET})

        })

    }

    function refresh() {

        if (wasRerfreshedOnce) {
            setPathVal({path: FsTools.GetPlatformPath("ShouldBeWorking1.jpg")})
        } else {
            setPathVal({path: FsTools.GetPlatformPath("Target.jpg")})
        }


        setWasRefreshedOnce(!wasRerfreshedOnce)

    }


    console.log("Refreshing")


    return (
        <div>

            <button onClick={copyClicked}>Copy</button>
            <button onClick={refresh}>Refresh</button>


            <img
                src={FsTools.ConvertFilePath(pathVal.path)}
                style={{height: "150px", width: "300px"}}
            />
        </div>


    )
}