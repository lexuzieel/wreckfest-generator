const _ = require('lodash')
const fs = require('fs')

function getEvent(options) {
    return (
        `el_add=${options.track}\n` +
        `el_gamemode=${options.gamemode}\n` +
        `el_laps=${options.laps}\n` +
        `el_car_reset_disabled=${options.car_reset_disabled ? 1 : 0}\n` +
        `el_wrong_way_limiter_disabled=${options.wrong_way_limiter_disabled ? 1 : 0}\n` +
        `el_car_class_restriction=${options.car_class_restriction || ''}\n` +
        `el_car_restriction=${options.car_restriction || ''}\n` +
        `el_weather=${options.weather || ''}\n`
    )
}

let collections = [
    {
        tracks: JSON.parse(fs.readFileSync('tracks.json'))
    }
]

/**
 * Get item from weighted collection.
 *
 * @param {array} collection
 */
function sample(collection) {
    let r = Math.random()
    let max = _.get(_.maxBy(collection, 'weight'), 'weight', 1)
    let sample = {}

    do {
        sample = _.sample(collection)
    } while (_.get(sample, 'weight', 1) / max < r)

    return sample
}

/**
 *
 * Generate an array of numbers in the
 * range between range[0] and range[1].
 *
 * @param {array} range
 */
function range(range) {
    let result = []

    for (let i = range[0]; i <= range[1]; i++) {
        result.push(i)
    }

    return result
}

let count = 100;

let out =
    `#====================================\n` +
    `# Automatically generated event loops\n` +
    `# Number of events: ${count}\n` +
    `#====================================\n`

let collection = _.first(collections)

for (let i = 0; i < count; i++) {
    let track = sample(collection.tracks)

    let weather = sample(_.get(track, 'weathers', [
        { name: 'hazy sunrise' },
        { name: 'cloudy morning' },
        { name: 'overcast day' },
        { name: 'clear afternoon' }
    ])) || ''

    out += '\n'

    out += getEvent({
        track: track.name,
        gamemode: sample(_.get(track, 'gamemodes', [
            {
                "name": "racing",
                "weight": 2
            },
            {
                "name": "team race",
                "weight": 1
            }
        ])).name,
        laps: sample(range(track.laps || [3, 7])),
        car_class_restriction: 'c',
        weather: weather.name
    })
}

fs.writeFile("out", out, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Event loop file has been saved into 'out'.");
});
