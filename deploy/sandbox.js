require(__dirname + '/../aws-credentials.json'); // make sure that file is there before trying anything else
const AWS = require('aws-sdk');

console.log("process env url",process.env.npm_package_url)
console.log("process env ",process.env)
//console.log("process",process)
process.env.npm_package_url = "https://cse-256-f22.github.io/information_foraging-joeyallen761/";
if (
    process.env.npm_package_url === "put your repository's home page url here"
) {
    throw new Error(
        'Remember to change the url field in your package.json file to point to your github pages index.html.'
    );
}

AWS.config.loadFromPath(__dirname + '/../aws-credentials.json');

const extQ = `<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
                        <ExternalURL>${process.env.npm_package_url}?wustl_key=riley.mccuen.testing%26sandbox=false%26project=information-foraging%26iteration=1%26tag=math</ExternalURL>
                        <FrameHeight>0</FrameHeight>
                    </ExternalQuestion>`;
console.log("extQ",extQ)

const request = {
    AssignmentDurationInSeconds: 100000,
    AutoApprovalDelayInSeconds: 100000,
    Description: 'This is a sandbox test hit from the 256 console.',
    LifetimeInSeconds: 1000,
    MaxAssignments: 100,
    Reward: '0.01',
    Title: 'This is a hit for 256 console testing',
    Question: extQ,
};

const m = new AWS.MTurk();
m.createHIT(request, (err, data) => {
    if (err !== null && err !== undefined) {
        console.log('An error has occurred:\n' + JSON.stringify(err, null, 2));
    } else {
        console.log(
            'Your request appears to have gone through successfully:\n' +
                JSON.stringify(data, null, 2)
        );
    }
});
