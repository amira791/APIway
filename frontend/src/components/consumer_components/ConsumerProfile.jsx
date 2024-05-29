import React, { useEffect, useState } from 'react'
import Navbar from '../global_components/navbar'
import Footer from '../global_components/footer'
import { useAuthContext } from '../../context/authContext';
import Ticket from '../tickets_components/Ticket';
import TicketsList from '../tickets_components/TicketsList';
import useTicket from '../../hooks/useTicket';
import useAccounts from '../../hooks/useAccounts';
import ConsumerProfileForm from './ConsumerProfileForm';

export default function ConsumerProfile() {

    const { authState } = useAuthContext();
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const { getConsumerTickets, tickets, error, loading } = useTicket();
    const { consumer, getConsumerInfos } = useAccounts();

    const handleTicketClick = (ticketId) => {
        setSelectedTicketId(ticketId);
    };

    useEffect(() => {
        getConsumerTickets(authState.userId);
        getConsumerInfos(authState.userId);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while fetching data
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message if an error occurs
    }

    return (
        <>


            <div className="body header-fixed">

                <div id="wrapper" className="wrapper-style">
                    <div id="page" className="clearfix">
                        <Navbar />

                        <section className="tf-dashboard tf-tab">
                            <div className="tf-container">
                                <div className="row ">
                                    <div className="col-xl-3 col-lg-12 col-md-12">
                                        <div className="dashboard-user">
                                            <div className="dashboard-infor">
                                                <div className="avatar">
                                                    <img src={consumer?.user ? consumer?.user?.picture : "/assets/images/author/user.png"} alt="images" />
                                                </div>
                                                <div className="name"> {authState.username} 
                                                {consumer?.user?.first_name} {consumer?.user?.last_name}
                                                </div>

                                            </div>
                                            <div className="dashboard-filter">
                                                <ul className="filter-menuu menu-tab">

                                                    <li ><a href="#" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path class="svg-fill" d="M13.1493 1.66797H6.84935C3.69935 1.66797 2.91602 2.50964 2.91602 5.86797V15.2513C2.91602 17.468 4.13268 17.993 5.60768 16.4096L5.61602 16.4013C6.29935 15.6763 7.34102 15.7346 7.93268 16.5263L8.77435 17.6513C9.44935 18.543 10.541 18.543 11.216 17.6513L12.0577 16.5263C12.6577 15.7263 13.6993 15.668 14.3827 16.4013C15.866 17.9846 17.0743 17.4596 17.0743 15.243V5.86797C17.0827 2.50964 16.2993 1.66797 13.1493 1.66797ZM12.291 8.95964H7.70768C7.36602 8.95964 7.08268 8.6763 7.08268 8.33464C7.08268 7.99297 7.36602 7.70964 7.70768 7.70964H12.291C12.6327 7.70964 12.916 7.99297 12.916 8.33464C12.916 8.6763 12.6327 8.95964 12.291 8.95964Z" fill="#3749E9" />
                                                    </svg>Tickets</a></li>
                                                    <li><a href="#" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path class="svg-fill" d="M16.2586 4.8763L11.3086 2.01797C10.5003 1.5513 9.50026 1.5513 8.68359 2.01797L3.74193 4.8763C2.93359 5.34297 2.43359 6.20964 2.43359 7.1513V12.8513C2.43359 13.7846 2.93359 14.6513 3.74193 15.1263L8.69193 17.9846C9.50026 18.4513 10.5003 18.4513 11.3169 17.9846L16.2669 15.1263C17.0753 14.6596 17.5753 13.793 17.5753 12.8513V7.1513C17.5669 6.20964 17.0669 5.3513 16.2586 4.8763ZM10.0003 6.11797C11.0753 6.11797 11.9419 6.98464 11.9419 8.05964C11.9419 9.13464 11.0753 10.0013 10.0003 10.0013C8.92526 10.0013 8.05859 9.13464 8.05859 8.05964C8.05859 6.99297 8.92526 6.11797 10.0003 6.11797ZM12.2336 13.8846H7.76693C7.09193 13.8846 6.70026 13.1346 7.07526 12.5763C7.64193 11.7346 8.74193 11.168 10.0003 11.168C11.2586 11.168 12.3586 11.7346 12.9253 12.5763C13.3003 13.1263 12.9003 13.8846 12.2336 13.8846Z" fill="#3749E9" />
                                                    </svg> Account Setting</a></li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-12 col-md-12 overflow-table">
                                        <div className="dashboard-content inventory content-tab">

                                            {!selectedTicketId ? (
                                                <div className="inner-content inventory favorite">
                                                    <h4 className="title-dashboard">Tickets</h4>

                                                    <TicketsList tickets={tickets} ticket_id={selectedTicketId} onTicketClick={handleTicketClick} />
                                                </div>
                                            )
                                                : (<Ticket ticket_id={selectedTicketId} onTicketClick={handleTicketClick} />)

                                            }
                                            <div className="inner-content profile">
                                                <h4 className="title-dashboard">Edit Profile</h4>
                                                <ConsumerProfileForm consumer_id={authState.userId} />
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </section>

                        <Footer />
                    </div>

                </div>


                <a id="scroll-top"></a>

            </div>

        </>
    )
}
