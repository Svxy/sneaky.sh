document.addEventListener('DOMContentLoaded', async () => {
    const githubStats = document.getElementById('github-stats');
    const wakatimeStats = document.getElementById('wakatime-stats');

    async function fetchGitHubStats() {
        try {
            let res = await fetch('https://api.github.com/users/svxy');
            let data = await res.json();
            githubStats.innerHTML = `
                <p>Repos: ${data.public_repos}</p>
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
            `;
        } catch (error) {
            githubStats.textContent = 'GitHub stats unavailable.';
            console.error(error);
        }
    }

    async function fetchWakaTimeStats() {
        try {
            let res = await fetch('https://wakafetch.sneaky.sh/api/wakatime');
            let data = await res.json();
    
            if (data && data.allTime && data.last7Days) {
                wakatimeStats.innerHTML = `
                    <p><strong>All-Time Coding Time:</strong> ${data.allTime.codingTime}h</p>
                    <p><strong>Most Active Day:</strong> ${data.allTime.mostActiveDay}</p>
                    <p><strong>Most Active Time:</strong> ${data.allTime.mostActiveTime}</p>
                    <p><strong>Top Languages (Last 7 Days):</strong> ${data.last7Days.topLanguages}</p>
                    <p><strong>Coding Time (Last 7 Days):</strong> ${data.last7Days.codingTime}h</p>
                    <p><strong>Active Days (Last 7 Days):</strong></p>
                    <ul>
                        ${Array.isArray(data.last7Days.activeDays) && data.last7Days.activeDays.length > 0
                            ? data.last7Days.activeDays.map(day => `
                                <li>${day.date}: ${day.hours}h</li>
                            `).join('')
                            : '<li>No active days available</li>'
                        }
                    </ul>
                `;
            } else {
                wakatimeStats.textContent = 'WakaTime stats unavailable.';
            }
        } catch (error) {
            console.error(error);
        }
    }

    fetchGitHubStats();
    fetchWakaTimeStats();

    window.addEventListener('resize', () => {
        document.body.style.height = `${window.innerHeight}px`;
    });
});