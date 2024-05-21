import React from 'react'

export default function ProviderProfile() {
  return (
    <>
                                                <form action="#" className="form-edit-profile">
                                                <div className="user-profile">
                                                    <div className="title">Contact details</div>
                                                    <fieldset>
                                                        <h6>Full Name</h6>
                                                        <input type="text" placeholder="Francisco Maia" required />
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Gender</h6>
                                                        <input type="text" placeholder="Female" required />
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Date of birth</h6>
                                                        <input type="text" placeholder="January 24, 1983" required />
                                                    </fieldset>
                                                </div>
                                                <div className="user-profile">
                                                    <div className="title">Contact details</div>
                                                    <fieldset>
                                                        <h6>Email Address</h6>
                                                        <input type="text" placeholder="Francisco Maia" required />
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Gender</h6>
                                                        <input type="text" placeholder="seb.bennett@gmail.com" required />
                                                    </fieldset>
                                                    <fieldset>
                                                        <h6>Address</h6>
                                                        <input type="text" placeholder="83222 Dicki View, South Pasqualeview, RI 79216-3100" required />
                                                    </fieldset>
                                                </div>
                                                <button className="btn-form" type="submit">
                                                    Update Settings
                                                </button>
                                            </form></>
  )
}
