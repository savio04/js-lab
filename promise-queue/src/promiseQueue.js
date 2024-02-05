const jobs = []

export function enqueue(promise) {
  return new Promise((resolve, reject) => {
    const job = async () => {
      try {
        const response = await promise()

        resolve(response)
      } catch(error){
        reject(error)
      } finally {
        jobs.shift()

        dequeue()
      }
    }

    jobs.push(job)

    if(jobs.length === 1) {
      dequeue()
    }
  })
}

function dequeue() {
  const job = jobs[0]

  if(job) {
    job()
  }
}
