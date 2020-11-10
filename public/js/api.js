const API_KEY = "2c337fae66b545ae93f55a837a1ecd82";
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2003;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_MATCH = `${BASE_URL}competitions/${LEAGUE_ID}/matches`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};
// Ambil data standing
function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then((response) => {
            if (response) {
                response.json().then((data) => {
                    console.log(data);
                    showStanding(data);
                });
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement = document.getElementById("Standings");

    data.standings[0].table.forEach((standing) => {
        standings += `
            <div class="row">
                <div class="col s12 m12">
                
                <div class="card blue-grey darken-3">
                <center> 
                    <div class="card-image" style="width: 80%; padding-top: 50px;">
                        <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge"/>
                    </div>
                    <div class="card-content light-green-text text-darken-1">
                        <h5 class="header">${standing.team.name}</h5>
                        Win : ${standing.won} <br/>
                        Draw : ${standing.draw} <br/>
                        Lost : ${standing.lost} <br/>
                        Points : ${standing.points} <br/>
                        Goals For : ${standing.goalsFor} <br/>
                        Goals Against : ${standing.goalsAgainst} <br/>
                        Goals Difference : ${standing.goalDifference} <br/>
                    </div>
                </center>
                </div>
                
                </div>
            </div>
                  `;
    });
    standingElement.innerHTML = standings;
}
// ambil data match
function getAllMatch() {
    if ("caches" in window) {
        caches.match(ENDPOINT_MATCH).then((response) => {
            if (response) {
                response.json().then((data) => {
                    console.log(data);
                    showMatch(data);
                });
            }
        })
    }

    fetchAPI(ENDPOINT_MATCH)
        .then(data => {
            showMatch(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showMatch(data) {
    let matchesHTML = "";
    let matchElement = document.getElementById("Matches");

    data.matches.forEach((match) => {
        matchesHTML += `
                <div class="row">
                  <div class="col s12 m12">
                    <div class="card blue-grey darken-3">
                      <div class="card-content light-green-text text-darken-1">
                        <h5> ${match.homeTeam.name} VS ${match.awayTeam.name} </h5>
                        ${data.competition.name} ( ${data.competition.area.name} )
                      </div>
                      <div class="card-action">
                        <a href="../schedule-info.html?id=${match.id}">Read More...</a>
                      </div>
                    </div>
                  </div>
                </div>
        `;
    });
    matchElement.innerHTML = matchesHTML;
}

function getMatchById() {
    return new Promise((resolve, reject) => {
        // Ambil nilai query parameter (?id=)
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(`${BASE_URL}matches/${idParam}`).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        let matchIdHTML = `
                            <div class="row">
                                <div class="col s12 m12">
                                    <div class="card blue-grey darken-3">
                                    <div class="card-image">
                                        <img src="${data.match.competition.area.ensignUrl.replace(/^http:\/\//i, 'https://')}" alt="flag"/>
                                    </div>
                                    <div class="card-content light-green-text text-darken-1">
                                        <div calss="card-title">
                                            <h4 class="header center"> ${data.match.homeTeam.name} VS ${data.match.awayTeam.name} </h3>
                                        </div>
                                    <h5 class="center"><i>${data.match.competition.name} (${data.match.competition.area.name})</i></h5>
                                        <b>Save The Date !</b><br/>
                                        Start Date : ${data.match.season.startDate} <br/>
                                        End Date : ${data.match.season.endDate} <br/>
                                        Match Day : ${data.match.matchday} <br/>
                                        Venue : ${data.match.venue} <br/>
                                        Group : ${data.match.group} <br/>
                                        Home Team : ${data.match.homeTeam.name} <br/>
                                        Away Team : ${data.match.awayTeam.name}
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                        `;
                        // Sisipkan komponen card ke dalam elemen dengan id #schedule
                        document.getElementById("schedule").innerHTML = matchIdHTML;
                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(`${BASE_URL}matches/${idParam}`)
            .then((data) => {
                console.log(data);
                // Menyusun komponen card artikel secara dinamis
                let matchIdHTML = `
                        <div class="row">
                            <div class="col s12 m12">
                                <div class="card blue-grey darken-3">
                                <div class="card-image">
                                    <img src="${data.match.competition.area.ensignUrl.replace(/^http:\/\//i, 'https://')}" alt="badge"/>
                                </div>
                                <div class="card-content light-green-text text-darken-1">
                                    <div calss="card-title">
                                        <h4 class="header center"> ${data.match.homeTeam.name} VS ${data.match.awayTeam.name} </h3>
                                    </div>
                                <h5 class="center"><i>${data.match.competition.name} ( ${data.match.competition.area.name} ) </i></h5>
                                
                                    <b>Save The Date ! </b><br/>
                                    Start Date : ${data.match.season.startDate} <br/>
                                    End Date : ${data.match.season.endDate} <br/>
                                    Match Day : ${data.match.matchday} <br/>
                                    Venue : ${data.match.venue} <br/>
                                    Group : ${data.match.group} <br/>
                                    Home Team : ${data.match.homeTeam.name} <br/>
                                    Away Team : ${data.match.awayTeam.name}
                                
                                </div>  
                                </div>
                            </div>
                        </div>
                               `;
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("schedule").innerHTML = matchIdHTML;
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            });
    });
}

function getSaveMatch() {

    getAll().then((schedules) => {
        console.log(schedules);
        // Menyusun komponen card artikel secara dinamis
        let saveMatchHTML = "";
        schedules.forEach((data) => {
            saveMatchHTML += `
                    <div class="row">
                        <div class="col s12 m12">
                            <div class="card blue-grey darken-3">
                            <div class="card-content light-green-text text-darken-1">
                                <h5> ${data.homeTeam.name} VS ${data.awayTeam.name} </h5>
                                ${data.competition.name} (${data.competition.area.name})
                            </div>
                            <div class="card-action">
                                <a href="../schedule-info.html?id=${data.id}&saved=true">Read More...</a>
                            </div>
                            </div>
                        </div>
                    </div>
                  `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #saved
        document.getElementById("saved").innerHTML = saveMatchHTML;
    });
}

function getSavedMatchById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(idParam).then((data) => {
        let saveMatchIdHTML = `
                <div class="row">
                    <div class="col s12 m12">
                        <div class="card blue-grey darken-3">
                        <div class="card-image">
                            <img src="${data.competition.area.ensignUrl.replace(/^http:\/\//i, 'https://')}" alt="badge"/>
                        </div>
                        <div class="card-content light-green-text text-darken-1">
                            <div calss="card-title">
                                <h4 class="header center"> ${data.homeTeam.name} VS ${data.awayTeam.name} </h3>
                            </div>
                            <h5 class="center"><i>${data.competition.name} ( ${data.competition.area.name} ) </i></h5>
                            <b>Save The Date ! </b><br/>
                            Start Date : ${data.season.startDate} <br/>
                            End Date : ${data.season.endDate} <br/>
                            Match Day : ${data.matchday} <br/>
                            Venue : ${data.venue} <br/>
                            Group : ${data.group} <br/>
                            Home Team : ${data.homeTeam.name} <br/>
                            Away Team : ${data.awayTeam.name}
                        </div>  
                        </div>
                    </div>
                </div>
                       `;
        // Sisipkan komponen card ke dalam elemen dengan id #schedule
        document.getElementById("schedule").innerHTML = saveMatchIdHTML;
    });
}