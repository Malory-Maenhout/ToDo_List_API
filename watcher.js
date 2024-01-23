import {spawn} from 'node:child_process'

const [node, _, file] = process.argv

function spawnNode () {
    const pr = spawn(node, [file])
    pr.stdout.pipe(process.stdout)
    pr.stderr.pipe(process.stderr)

    pr.stderr.on('data', (data) => {
        console.error(data.toString('utf8'))
    })

    pr.on('close', (code) => {
        if (code !== null) {
            process.exit(code)
        }
    })

    return pr
}

let childNodeProcess = spawnNode()
const watcher = watch('./', {recursive: true})
for await (const event of watcher) {
    if (event.filename.endswith('.js')) {
        childNodeProcess.kill('SIGKILL')
        childNodeProcess = spawnNode()
    }
}