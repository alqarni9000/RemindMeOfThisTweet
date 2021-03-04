'use strict';

module.exports = {
    newReminderSet,
};

const AWS = require('aws-sdk');
const cloudWatch = new AWS.CloudWatch();

function newReminderSet(reminderData) {
    const term = Math.round((reminderData.remindAt - reminderData.refDate) / 1000);
    const params = generateMetricsPayload(term, 1);
    return cloudWatch.putMetricData(params).promise();
}

function generateMetricsPayload(term, number) {
    return {
        MetricData: [
            {
                MetricName: 'Reminders',
                Timestamp: new Date,
                Unit: 'Count',
                Value: number
            },
        ],
        Namespace: 'RemindMeOfThisTweet'
    };
}
