import DS from 'ember-data';
import {union, filterBy, sum, mapBy} from '@ember/object/computed';
import { computed } from '@ember/object';

export default DS.Model.extend({
    name: DS.attr('string'),
    homeGames: DS.hasMany('game', {inverse: "homeTeam"}),
    awayGames: DS.hasMany('game', {inverse: "awayTeam"}),
    games: union('homeGames', 'awayGames'),
    gamesDrawn: filterBy('games', 'isDraw'),
    homeGamesWon: filterBy('games', 'isHomeWin'),
    awayGamesWon: filterBy('games', 'isAwayWin'),
    gamesWon: union('homeGamesWon', 'awayGamesWon'),

    homeGamesLost: filterBy('games', 'isAwayWin'),
    awayGamesLost: filterBy('games', 'isHomeWin'),
    gamesLost: union('homeGamesLost', 'awayGamesLost'),

    homeGoalsScoredArray: mapBy('homeGames', 'homeGoals'),
    homeGoalsScored: sum('homeGoalsScoredArray'),

    awayGoalsScoredArray: mapBy('awayGames', 'awayGoals'),
    awayGoalsScored: sum('awayGoalsScoredArray'),

    goalsScored: computed('homeGoalsScored', 'awayGoalsScored', function(){
        return this.homeGoalsScored + this.awayGoalsScored;
    }),


    homeGoalsConcededArray: mapBy('homeGames', 'awayGoals'),
    homeGoalsConceded: sum('homeGoalsConcededArray'),

    awayGoalsConcededArray: mapBy('awayGames', 'homeGoals'),
    awayGoalsConceded: sum('awayGoalsConcededArray'),

    goalsConceded: computed('homeGoalsConceded', 'awayGoalsConceded', function(){
        return this.homeGoalsConceded + this.awayGoalsConceded;
    })
});
