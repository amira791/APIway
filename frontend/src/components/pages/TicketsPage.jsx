import React from 'react'
import TicketsList from '../tickets/TicketsList'
export default function TicketsPage() {
    const api_id = 7;
  return (
    <>
    <div>TicketsPage</div>
    <TicketsList api_id={api_id}/>
    </>
  )
}
