import React from 'react'

import './App.css'


import FsTools from "@api/FsTools";
import TauriOsPlugin from "./tauri/plugin_os";
import TauriProjectPlugin from "./tauri/plugin_project";

export default function App() {


    const [isLoading, setIsLoading] = React.useState(true)

    const init = async () => {

        FsTools.WORK_DIR = await TauriOsPlugin.GetWorkingDirectory()

        await TauriProjectPlugin.ActivateLastProject()

    }


    React.useEffect(() => {
        setIsLoading(true)

        init.then(() => {
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
            </div>

        )
    }

}


function _Working() {
    return (
        <img
            src={FsTools.GetPlatformPath("ShouldBeWorking.jpg")}
            style={{height: "150px", width: "300px"}}
        />
    )
}

function _NotWokrking() {

    const [pathVal, setPathVal] = React.useState({})

    function copyClicked() {
        TauriOsPlugin.CopyFile(FsTools.GetPlatformPath("ToBeCopied.jpg"), FsTools.GetPlatformPath("Target.jpg"))
    }


    return (
        <div>

            <button onClick={copyClicked}>Copy</button>


            <img
                src={FsTools.GetPlatformPath("Target.jpg")}
                style={{height: "150px", width: "300px"}}
            />
        </div>


    )
}