import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { 
    Segment,
    Grid,
    Header,
    Table,
    Label,
    Icon
} from 'semantic-ui-react';

import { getApiSampServer } from '../../actions/samp';

import Sidebar from '../../layouts/sidebar/Sidebar';
import Loader from '../../layouts/loader/Loader';

const Dashboard = ({ auth: { user }, samp: { server, setLoading }, getApiSampServer }) => {
    useEffect(() => {
        getApiSampServer();
    }, [getApiSampServer])

    return (
        <>
            <section id="dashboard">
                <Grid stackable>
                    <Sidebar isVerified={user && user.setLoading} />
                    <Grid.Column stretched width={12}>
                        <Segment>
                            <img
                                src="https://media.giphy.com/media/YkrEHLsVinbIuddp1q/200w_d.gif"
                                height="200"
                                style={{ width: '60%', height: '0 auto', textAlign: 'center' }}
                                alt="welcome_kim_jong_un"
                            />
                            <Header as="h3">Welcome to EvoniX Roleplay</Header><hr/>
                            <p style={{ textAlign: 'justify' }}>
                                Sebuah media pemenuhan hasrat para roleplayer sekalian yang ingin dan rindu akan vibe roleplay yang bold dan realistis tanpa ada embel-embel murahan lain nya. Di server ini para player memiliki kebebasan untuk mengekspresikan diri sebebas-bebas nya, dan tentu saja harus dilandasi oleh server rules yang berlaku. Dengan demikian segenap Server Management, dan Administator mengharapkan kenyamanan bagi para player yang nantinya bermain di server ini.
                            </p>
                            <Grid stackable columns={2}>
                                <Grid.Column>
                                    <Segment>
                                        <Header as="h3" textAlign="center">Profile</Header>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell><b>Username</b></Table.Cell>
                                                    <Table.Cell>{ user && user.name }</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><b>Email</b></Table.Cell>
                                                    <Table.Cell>{ user && user.email }</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><b>Admin</b></Table.Cell>
                                                    <Table.Cell>{ user && user.admin }</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><b>Helper</b></Table.Cell>
                                                    <Table.Cell>{ user && user.helper }</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><b>Joined</b></Table.Cell>
                                                    <Table.Cell><Moment unix format="llll">{ user && user.registered_date }</Moment></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell><b>Last Login</b></Table.Cell>
                                                    <Table.Cell>{ user && user.lastlogin === 0 ? ('Not logged in yet') : (<Moment unix fromNow>{ user && user.lastlogin }</Moment>) }</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column>
                                    <Segment>
                                        <Header as="h3" textAlign="center">Server Status</Header>
                                        { setLoading ? (<Loader isLoading={setLoading} />) : 
                                            server && server.active ? (
                                                <Label color="green" size="tiny" pointing="left" floating>
                                                    <Icon name="wifi" /> Online
                                                </Label>
                                            ) : (
                                                <Label color="red" size="tiny" pointing="left" floating>
                                                    <Icon name="power off" /> Offline
                                                </Label>
                                            ) (
                                                <Table>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell><b>IP</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.ip }</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><b>Hostname</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.hn }</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><b>Players</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.pc } / { server && server.core.pm }</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><b>Gamemode</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.gm }</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><b>Language</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.la }</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell><b>Version</b></Table.Cell>
                                                            <Table.Cell>{ server && server.core.vn }</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                            )
                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </section>
        </>
    )
}

Dashboard.propTypes = {
    getApiSampServer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    samp: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    samp: state.samp
});

export default connect(mapStateToProps, { getApiSampServer })(Dashboard);
