import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function getXcodeVersion(): Promise<number> {
  let output = ''
  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString()
      }
    },
    silent: false
  }
  core.warning(
    `Xcode version checking!`
  )

  await exec.exec('xcodebuild', ['-version'], options)
  core.warning(
    `Xcode version output was ${output}`
  )
  const match = output.match(/Xcode (\d+)/)
  if (match) {
    let versionParsed = parseInt(match[1], 10)
    core.warning(
      `Xcode version match versionParsed: ${versionParsed}`
    )
    core.warning(
      `Xcode version match versionParsed is older than 16: ${versionParsed >= 16}`
    )
    return versionParsed
  } else {
    core.warning(
      `Failed to determine Xcode version from command 'xcodebuild -version'.`
    )
    core.info(output)
    return 0
  }
}
