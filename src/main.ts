import * as core from '@actions/core'
import {setToken, createBucket} from '@linode/api-v4'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('linodeToken')

    setToken(token)

    try {
      const bucket = await createBucket({
        label: `stvnjacobs-manager-${process.env.GITHUB_SHA}`,
        cluster: 'us-east-1'
      })
      core.setOutput('bucketLabel', bucket.label)
      core.setOutput('bucketCreated', bucket.created)
      core.setOutput('bucketCluster', bucket.cluster)
      core.setOutput('bucketHostname', bucket.hostname)
      core.setOutput('bucketSize', bucket.size)
    } catch (error) {
      core.setFailed(error.message)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
