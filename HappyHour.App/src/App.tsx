import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { beerOutline, receiptOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectedRoute } from './components';
import { SessionProvider } from './context/session';
import { CreateSessionPage, SessionPage, TrackDrinksPage } from './pages';
import './theme/main.css';
import './theme/variables.css';

const App: React.FC = () => {
    const renderDefault = () => <Redirect to="/create-session" />;

    return (
        <IonApp>
            <IonReactRouter>
                <SessionProvider>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/create-session" component={CreateSessionPage} exact={true} />
                            <ProtectedRoute path="/track-drinks" component={TrackDrinksPage} exact={true} />
                            <ProtectedRoute path="/session" component={SessionPage} exact={true} />
                            <Route path="/" render={renderDefault} exact={true} />
                        </IonRouterOutlet>

                        <IonTabBar slot="bottom">
                            <IonTabButton tab="track-drinks" href="/track-drinks">
                                <IonIcon icon={beerOutline} />
                                <IonLabel>Track Drinks</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="session" href="/session">
                                <IonIcon icon={receiptOutline} />
                                <IonLabel>Session</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </SessionProvider>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
