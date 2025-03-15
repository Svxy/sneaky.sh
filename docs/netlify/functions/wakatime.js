const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'WakaTime API key misconfigured.' })
    };
  }

  try {
    const last7DaysRes = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`);
    const last7DaysData = await last7DaysRes.json();

    const allTimeRes = await fetch(`https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${apiKey}`);
    const allTimeData = await allTimeRes.json();

    const topLanguages = last7DaysData.data.languages.map(lang => lang.name).join(', ');

    return {
      statusCode: 200,
      body: JSON.stringify({
        allTime: {
          codingTime: (allTimeData.data.total_seconds / 3600).toFixed(2),
          mostActiveDay: allTimeData.data.most_active_day,
          mostActiveTime: allTimeData.data.most_active_time,
        },
        last7Days: {
          codingTime: (last7DaysData.data.total_seconds / 3600).toFixed(2),
          topLanguages: topLanguages,
          activeDays: last7DaysData.data.days.map(day => ({
            date: day.date,
            hours: (day.total_seconds / 3600).toFixed(2),
          })),
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching WakaTime stats.' })
    };
  }
};