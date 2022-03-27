const dir = [[0,1],[1,0],[-1,0]]

function minimumMovement(obstacleLanes) {
    console.log(obstacleLanes)
    // lets try the normal BFS
    // a grid with 1 based index
    const queue = [[2,0,0]] // the third elem in the subArr is the amoung of sideways
    const prevs = new Set() // this is the memo
    let min = Infinity
    let latestRow = 0
    while(queue.length>0) {
        const cur = queue.shift()
        const memokey = `${cur[0]},${cur[1]}`
        prevs.add(memokey)
        console.log(`at ${memokey} sideways count ${cur[2]}`)
        if(obstacleLanes[cur[1]-1] == cur[0]) {
            // theres. obstacle, no go
            console.log("obstacle")
            continue
        }
        if(cur[1] > latestRow) {
            latestRow = cur[1]
            min= Infinity // rest min value
        }
        if(cur[1] == latestRow) {
            // we're at finish line, or latest lane we can reach
            // find minimum
            console.log(`finish at ${memokey}`)
            latestRow = cur[1]
            min = Math.min(min, cur[2])
        }
        for(const d of dir) {
            const newPos = [cur[0]+d[0],cur[1]+d[1]]
            if(d[0]!=0) {
                // moving sideways
                // console.log(`moving sideways ${newPos[0]},${newPos[1]}`)
                newPos[2] =cur[2] +1
            } else {
                newPos[2] =cur[2]
            }
            const memokeyNew = `${newPos[0]},${newPos[1]}`
            if(newPos[0]>=1 && newPos[0]<=3 && newPos[1]<=obstacleLanes.length && !prevs.has(memokeyNew)) {
                // make sure we're in boundary
                queue.push(newPos)
            }
        }

        // prevs.add(memokey)
    }
    return min
}

// let cc = minimumMovement([ 2, 3, 2, 1, 3, 1 ])
let cc = minimumMovement([ 1,1,3,2,3,1 ])
console.log(cc)