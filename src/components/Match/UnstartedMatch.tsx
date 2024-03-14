import React from 'react';
import { Segment, Grid, Form, Header, Button } from 'semantic-ui-react';

export default function UnstartedGame({game, onTeamUpdated, onPlayerUpdated, onCancel, onStart}) {
    const homePlayers = [];
    const awayPlayers = [];

    for (let i = 1; i <= 11; ++i) {
        homePlayers.push(<input placeholder={`Home Player ${i}`}
            value={game.home.players[`player_${i}`] || ''}
            onChange={(e) => onPlayerUpdated('home', `player_${i}`, e.target.value)}
            key={`home.players.player_${i}`} />);
        awayPlayers.push(<input placeholder={`Away Player ${i}`}
            value={game.away.players[`player_${i}`] || ''}
            onChange={(e) => onPlayerUpdated('away', `player_${i}`, e.target.value)}
            key={`away.players.player_${i}`} />);
    }

    return (
        <Segment>
            <Form>
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header as='h2' textAlign='center'>New Match</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                            <Grid.Column>
                                <input placeholder="Home Team"
                                    value={game.home.team}
                                    onChange={(e) => onTeamUpdated('home', e.target.value)} />
                            </Grid.Column>
                            <Grid.Column>
                                <input placeholder="Away Team"
                                    value={game.away.team}
                                    onChange={(e) => onTeamUpdated('away', e.target.value)} />
                            </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header as='h2' textAlign='center'>Players</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                            <Grid.Column>{homePlayers}</Grid.Column>
                            <Grid.Column>{awayPlayers}</Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column textAlign="right">
                            <Button.Group>
                                <Button primary onClick={onStart}>Start Game</Button>
                                <Button.Or />
                                <Button negative onClick={onCancel}>Cancel</Button>
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </Segment>
    );
}