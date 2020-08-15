import * as core from '@actions/core'
import {setToken, createBucket} from '@linode/api-v4'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('linodeToken', {required: true})
    const label: string = core.getInput('label', {required: true})
    const cluster: string = core.getInput('cluster')

    setToken(token)

    try {
      const bucket = await createBucket({
        label,
        cluster
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
