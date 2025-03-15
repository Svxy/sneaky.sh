document.addEventListener('DOMContentLoaded', async () => {
    const githubStats = document.getElementById('github-stats');
    const wakatimeStats = document.getElementById('wakatime-stats');

    async function fetchGitHubStats() {
        try {
            let res = await fetch('https://api.github.com/users/svxy');
            let data = await res.json();
            githubStats.innerHTML = `
                <p><strong>Repos:</strong> ${data.public_repos}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>
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
                const topLanguages = data.allTime.topLanguages ? data.allTime.topLanguages : 'N/A';
                const codingTimeAllTime = data.allTime.codingTime ? data.allTime.codingTime : '0';
                const codingTime7Days = data.last7Days.codingTime ? data.last7Days.codingTime : '0';
                const topEditor = data.allTime.topEditor ? data.allTime.topEditor : 'N/A';
                const topOperatingSystem = data.allTime.topOperatingSystem ? data.allTime.topOperatingSystem : 'N/A';
    
                wakatimeStats.innerHTML = `
                    <p><strong>All-Time Coding Time:</strong> ${codingTimeAllTime}h</p>
                    <p><strong>Coding Time (Last 7 Days):</strong> ${codingTime7Days}h</p>
                    <p><strong>Top Languages:</strong> ${topLanguages}</p>
                    <p><strong>Top Editor:</strong> ${topEditor}</p>
                    <p><strong>Top Operating System:</strong> ${topOperatingSystem}</p>
                `;
            } else {
                wakatimeStats.textContent = 'WakaTime stats unavailable.';
            }
        } catch (error) {
            console.error(error);
            wakatimeStats.textContent = 'Error fetching WakaTime stats.';
        }
    }

    fetchGitHubStats();
    fetchWakaTimeStats();

    window.addEventListener('resize', () => {
        document.body.style.height = `${window.innerHeight}px`;
    });
});