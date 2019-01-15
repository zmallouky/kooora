export interface IMatch {
    id ?: String,
    hometeam?: String;
    awayteam?: String;
    hometeamScore?: String;
    awayteamScore?: String;
}
export interface IPrediction {
    id ?: String,
    hometeam?: String;
    awayteam?: String;
    prob_HW?: String;
    prob_D?: String;
    prob_AW?: String;
}