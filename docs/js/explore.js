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
            let res = await fetch('https://api.sneaky.sh/v1/wakafetch');
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

    async function fetchSeaOfThievesStats() {
        try {
            const res = await fetch('https://api.sneaky.sh/v1/sea-of-thieves');
            const data = await res.json();
    
            if (!data) {
                throw new Error('Sea of Thieves stats unavailable.');
            }
    
            const playerStatsHTML = `
                <div class="subcategory">
                    <h3>Player</h3>
                    <p><strong>Title:</strong> ${data.balance.title || 'N/A'}</p>
                    <p><strong>Gold:</strong> ${data.balance.gold || '0'}</p>
                    <p><strong>Doubloons:</strong> ${data.balance.doubloons || '0'}</p>
                    <p><strong>Ancient Coins:</strong> ${data.balance.ancientCoins || '0'}</p>
                </div>
            `;
            document.getElementById('playerStats').innerHTML = playerStatsHTML;
    
            const shipStatsHTML = data.captaincy.Ships.map(ship => {
                return `
                    <div class="subcategory">
                        <h3>Ship: ${ship.Name} (${ship.Type})</h3>
                        <p><strong>Title:</strong> ${ship.Alignments[0].Title || 'N/A'}</p>
                        <p><strong>Gold Earned (Crew):</strong> ${ship.Alignments[0].Accolades[0].Stats[0].Value || '0'}</p>
                        <p><strong>Treasures Sold (Crew):</strong> ${ship.Alignments[0].Accolades[1].Stats[0].Value || '0'}</p>
                    </div>
                `;
            }).join('');
            document.getElementById('shipStats').innerHTML = shipStatsHTML;
    
        } catch (error) {
            document.getElementById('seaOfThievesStats').innerHTML = '<p>Error fetching Sea of Thieves stats.</p>';
            console.error(error);
        }
    }    

    fetchGitHubStats();
    fetchWakaTimeStats();
    fetchSeaOfThievesStats();

    window.addEventListener('resize', () => {
        document.body.style.height = `${window.innerHeight}px`;
    });
});