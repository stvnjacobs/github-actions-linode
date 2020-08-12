import * as core from '@actions/core'
import {setToken, getProfile} from '@linode/api-v4'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('linodeToken')

    setToken(token)

    try {
      const profile = await getProfile()
      core.setOutput('username', profile.username)
    } catch (error) {
      core.setFailed(error.message)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
